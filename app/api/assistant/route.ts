import { NextResponse } from "next/server";
import productFoundationJson from "@/content/product-foundation.json";
import { pricingContext } from "@/lib/pricing";
import type { ProductFoundation } from "@/types/product-foundation";

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

type AssistantRequest = {
  context?: {
    cart?: Array<{ name: string; quantity?: number }>;
    page?: string;
    saved?: Array<{ name: string }>;
  };
  locale?: "en" | "vi";
  message?: string;
  history?: ChatTurn[];
};

type GroqChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const productFoundation = productFoundationJson as ProductFoundation;
const MAX_HISTORY_TURNS = 8;
const GROQ_API_TIMEOUT = 8000;
const OPENROUTER_API_TIMEOUT = 9000;
const OPENROUTER_MODELS = [
  process.env.OPENROUTER_MODEL_PRIMARY ??
    "qwen/qwen3-next-80b-a3b-instruct:free",
  process.env.OPENROUTER_MODEL_FALLBACK ??
    "nvidia/nemotron-3-nano-30b-a3b:free",
];
const ASSISTANT_PROVIDER = process.env.ASSISTANT_PROVIDER ?? "groq";

function sanitizeHistory(history: unknown): ChatTurn[] {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (turn): turn is ChatTurn =>
        !!turn &&
        typeof turn === "object" &&
        (turn.role === "user" || turn.role === "assistant") &&
        typeof turn.content === "string" &&
        turn.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY_TURNS);
}

function validateAssistantRequest(payload: unknown): AssistantRequest | null {
  if (!payload || typeof payload !== "object") return null;

  const obj = payload as Record<string, unknown>;

  if (obj.message && typeof obj.message !== "string") return null;
  if (obj.history && !Array.isArray(obj.history)) return null;

  return obj as AssistantRequest;
}
function stripReasoningArtifacts(text: string): string {
  const withoutClosedBlocks = text.replace(/<think>[\s\S]*?<\/think>/gi, "");
  const openTagIndex = withoutClosedBlocks.search(/<think>/i);
  const withoutOpenTag =
    openTagIndex === -1
      ? withoutClosedBlocks
      : withoutClosedBlocks.slice(0, openTagIndex);

  return withoutOpenTag.replace(/<\/?think>/gi, "").trim();
}

export async function POST(request: Request) {
  let payload: AssistantRequest;

  try {
    payload =
      validateAssistantRequest(await request.json()) ?? (await request.json());
  } catch {
    console.error("Assistant request parse failed");
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const message = payload.message?.trim() ?? "";

  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  try {
    const locale = payload.locale === "vi" ? "vi" : "en";
    const history = sanitizeHistory(payload.history);
    const messages = [
      {
        role: "system" as const,
        content: buildSystemPrompt(locale, payload.context),
      },
      ...history,
      {
        role: "user" as const,
        content: message,
      },
    ];

    if (ASSISTANT_PROVIDER === "openrouter") {
      const forcedOpenRouterResult = await requestOpenRouter(messages);

      if (forcedOpenRouterResult.reply) {
        return NextResponse.json({
          reply: stripReasoningArtifacts(forcedOpenRouterResult.reply),
          mode: forcedOpenRouterResult.model,
          provider: "openrouter",
        });
      }

      return NextResponse.json(
        {
          error: "assistant_openrouter_unavailable",
          fallbackAvailable: false,
        },
        { status: 502 },
      );
    }

    const groqResult = await requestGroq(messages);

    if (groqResult.reply) {
      return NextResponse.json({
        reply: stripReasoningArtifacts(groqResult.reply),
        mode: "groq",
      });
    }

    const openRouterResult = await requestOpenRouter(messages);

    if (openRouterResult.reply) {
      return NextResponse.json({
        reply: stripReasoningArtifacts(openRouterResult.reply),
        mode: openRouterResult.model,
        provider: "openrouter",
      });
    }

    return NextResponse.json(
      {
        error: groqResult.limitRelated
          ? "assistant_provider_limited"
          : "assistant_unavailable",
        fallbackAvailable: Boolean(process.env.OPENROUTER_API_KEY),
      },
      { status: groqResult.limitRelated ? 429 : 502 },
    );
  } catch (error) {
    console.error("Assistant request failed", error);
    return NextResponse.json(
      {
        error: "assistant_unavailable",
        fallbackAvailable: Boolean(process.env.OPENROUTER_API_KEY),
      },
      { status: 502 },
    );
  }
}

async function requestGroq(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  if (!apiKey) return { limitRelated: false, reply: "" };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GROQ_API_TIMEOUT);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        body: JSON.stringify({
          messages,
          model,
          max_tokens: 220,
          temperature: 0.25,
        }),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        signal: controller.signal,
      },
    );

    const bodyText = response.ok ? "" : await response.text().catch(() => "");

    if (!response.ok) {
      console.error("Groq API error", response.status, bodyText || "unknown");
      return {
        limitRelated:
          response.status === 429 || /limit|quota|rate/i.test(bodyText),
        reply: "",
      };
    }

    const data = (await response.json()) as GroqChatResponse;

    return {
      limitRelated: false,
      reply: data.choices?.[0]?.message?.content?.trim() ?? "",
    };
  } catch (error) {
    console.error("Groq request failed", error);
    return { limitRelated: false, reply: "" };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function requestOpenRouter(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) return { model: "", reply: "" };

  for (const model of OPENROUTER_MODELS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      OPENROUTER_API_TIMEOUT,
    );

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          body: JSON.stringify({
            messages,
            model,
            max_tokens: 500,
            temperature: 0.25,
            reasoning: { exclude: true },
          }),
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://helicorp-petkit.vercel.app",
            "X-Title": "PETKIT Smart Cat Care",
          },
          method: "POST",
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        console.error(
          "OpenRouter API error",
          model,
          response.status,
          await response.text().catch(() => "unknown"),
        );
        continue;
      }

      const data = (await response.json()) as GroqChatResponse;
      const reply = data.choices?.[0]?.message?.content?.trim();

      if (reply) return { model, reply };
    } catch (error) {
      console.error("OpenRouter request failed", model, error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return { model: "", reply: "" };
}

function buildSystemPrompt(
  locale: "en" | "vi",
  context: AssistantRequest["context"],
) {
  const data = JSON.stringify(
    {
      claimSafety: productFoundation.claimSafety,
      ecosystem: productFoundation.ecosystem.products,
      litterBoxes: productFoundation.litterBoxFamily.products,
      pricing: pricingContext,
      useCases: productFoundation.useCaseComparison.rows,
    },
    null,
    2,
  );
  const userContext = JSON.stringify(
    {
      cart: context?.cart ?? [],
      currentPage: context?.page ?? "",
      saved: context?.saved ?? [],
    },
    null,
    2,
  );

  return [
    locale === "vi"
      ? "CRITICAL: You must reply ONLY in Vietnamese, regardless of what language the user writes in."
      : "CRITICAL: You must reply ONLY in English, regardless of what language the user writes in.",
    "Do not include any chain-of-thought, planning notes, or <think> tags in your reply. Output only the final answer text.",
    "You are PETKIT Assistant for a product landing-page coding test.",
    "Answer only from the supplied PETKIT project data. If the user asks outside PETKIT products, politely refuse and redirect to Pura Max 2/product fit/update flow.",
    "You have access to the recent conversation history. Use it to stay consistent and avoid repeating yourself or re-asking things already answered.",
    "You also have USER_CONTEXT with the current page, cart, and saved products. Use it to infer what the shopper is currently considering.",
    "If the user wants updates, availability, or consultation and has not provided a name and email, ask for the missing fields naturally. The website will handle saving valid contact details.",
    "If the user only greets you, answer as the model with a short greeting and ask what PETKIT product help they need today.",
    "Do not invent warranty, medical diagnosis, shipping, local distributor, or unsupported claims.",
    "Answer the latest user message directly, using conversation history as context. Keep answers concise: 2-4 short sentences. Mention caveats when relevant.",
    `PROJECT_DATA:\n${data}`,
    `USER_CONTEXT:\n${userContext}`,
  ].join("\n\n");
}
