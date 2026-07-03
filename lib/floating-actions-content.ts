export type ChatMessage = {
  from: "bot" | "user";
  text: string;
};

export const initialChatMessages: ChatMessage[] = [
  {
    from: "bot",
    text: "Hi, I can help with Pura Max 2 specs, product fit, and PETKIT care routines.",
  },
];

export const quickChatPrompts = ["Pura Max 2", "Compare models", "Care routine", "Availability"];

export const assistantReply =
  "Thanks for your message. A PETKIT team member will contact you as soon as possible.";
