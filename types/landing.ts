import type { z } from "zod";
import type { landingContentSchema } from "@/lib/landing-content.schema";

export type LandingContent = z.infer<typeof landingContentSchema>;
export type LandingNavItem = LandingContent["nav"][number];
export type LandingStat = LandingContent["primaryProduct"]["stats"][number];
export type LandingFeature = LandingContent["primaryProduct"]["features"][number];
