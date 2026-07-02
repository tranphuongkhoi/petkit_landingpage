import draftContent from "@/content/landing.draft.json";
import { landingContentSchema } from "@/lib/landing-content.schema";

export const landingContent = landingContentSchema.parse(draftContent);
