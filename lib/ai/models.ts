// Seedforge uses Claude models exclusively
// Opus for project generation (high quality, runs once)
// Sonnet for coaching (fast, low latency, runs continuously)

export const DEFAULT_CHAT_MODEL = "anthropic/claude-sonnet-4-6";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "anthropic/claude-sonnet-4-6",
    name: "Claude Sonnet",
    provider: "anthropic",
    description: "Fast coaching — used during workspace build sessions",
  },
  {
    id: "anthropic/claude-opus-4-6",
    name: "Claude Opus",
    provider: "anthropic",
    description:
      "Deep project generation — used for onboarding and project design",
  },
];

// Model aliases for different Seedforge contexts
export const COACHING_MODEL = "anthropic/claude-sonnet-4-6";
export const PROJECT_GENERATION_MODEL = "anthropic/claude-opus-4-6";
export const TITLE_MODEL = "anthropic/claude-sonnet-4-6";

// Group models by provider for UI
export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>,
);
