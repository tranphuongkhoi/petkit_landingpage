export type TrackingEventType = "lead_submit";

export type TrackingEventPayload = {
  email?: string;
  eventType: TrackingEventType;
  metadata?: Record<string, string | number | boolean | null>;
  name?: string;
  page: string;
  productId?: string;
  productName?: string;
  scrollDepth?: number;
};
