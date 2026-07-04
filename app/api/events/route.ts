import { NextResponse } from "next/server";
import type { TrackingEventPayload, TrackingEventType } from "@/types/event-tracking";

const allowedEventTypes = new Set<TrackingEventType>(["lead_submit"]);

type IncomingEventPayload = TrackingEventPayload;

export async function POST(request: Request) {
  let payload: IncomingEventPayload;

  try {
    payload = (await request.json()) as IncomingEventPayload;
  } catch (error) { console.error("Event forward failed", error);
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ forwarded: false, reason: "N8N_WEBHOOK_URL is not configured" });
  }

  if (payload.eventType !== "lead_submit") {
    return NextResponse.json({
      forwarded: false,
      reason: "Skipped non-lead event for signup webhook",
    });
  }

  const forwardedPayload = {
    ...payload,
    receivedAt: new Date().toISOString(),
    source: "petkit_landingpage",
  };

  let response: Response;

  try {
    response = await fetch(webhookUrl, {
      body: JSON.stringify(forwardedPayload),
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INTERNAL_TRACKING_SECRET
          ? { "X-Internal-Tracking-Secret": process.env.INTERNAL_TRACKING_SECRET }
          : {}),
      },
      method: "POST",
    });
  } catch (error) { console.error("Event forward failed", error);
    return NextResponse.json({ error: "Webhook forwarding request failed" }, { status: 502 });
  }

  if (!response.ok) {
    const body = await response.text();

    return NextResponse.json(
      {
        error: "Webhook forwarding failed",
        webhookStatus: response.status,
        webhookBody: body.slice(0, 500),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ forwarded: true });
}

function validatePayload(payload: IncomingEventPayload) {
  if (!allowedEventTypes.has(payload.eventType)) return "Unsupported event type";
  if (!payload.page || payload.page.length > 240) return "Page is required";
  if (payload.name && payload.name.length > 120) return "Name is too long";
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return "Email is invalid";
  if (payload.productId && payload.productId.length > 240) return "Product id is too long";
  if (payload.productName && payload.productName.length > 480) return "Product name is too long";
  if (payload.scrollDepth !== undefined && (payload.scrollDepth < 0 || payload.scrollDepth > 100)) {
    return "Scroll depth is invalid";
  }

  return null;
}

