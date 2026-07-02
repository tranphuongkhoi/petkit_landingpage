import landingContentJson from "@/content/landing-content.json";
import { landingContentSchema } from "@/lib/landing-content.schema";

export const landingContent = landingContentSchema.parse(landingContentJson);
