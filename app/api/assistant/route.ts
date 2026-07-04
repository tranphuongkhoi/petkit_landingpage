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

export async function POST(request: Request) {
  let payload: AssistantRequest;

  try {
    payload = validateAssistantRequest(await request.json()) ?? (await request.json());
  } catch {
    console.error("Assistant request parse failed");
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const message = payload.message?.trim() ?? "";

  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  if (!apiKey) {
    return NextResponse.json(
      { error: "assistant_unavailable" },
      { status: 503 },
    );
  }

  try {
    const locale = payload.locale === "vi" ? "vi" : "en";
    const history = sanitizeHistory(payload.history);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GROQ_API_TIMEOUT);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: buildSystemPrompt(locale, payload.context),
            },
            ...history,
            {
              role: "user",
              content: message,
            },
          ],
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

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("Groq API error", response.status, await response.text().catch(() => "unknown"));
      return NextResponse.json(
        { error: "assistant_unavailable" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as GroqChatResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "assistant_empty_response" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply, mode: "groq" });
  } catch (error) {
    console.error("Assistant request failed", error);
    return NextResponse.json(
      { error: "assistant_unavailable" },
      { status: 502 },
    );
  }
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