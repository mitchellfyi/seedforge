// Seedforge uses Claude models exclusively
// Opus for project generation (high quality, runs once)
// Sonnet for coaching (fast, low latency, runs continuously)

const SONNET = "anthropic/claude-sonnet-4-6";
const HAIKU = "anthropic/claude-haiku-4-5-20251001";

// Chat model: overridable via CHAT_MODEL env var, defaults to Sonnet, falls back to Haiku
export const DEFAULT_CHAT_MODEL = process.env.CHAT_MODEL || SONNET;

// Fallback model used when the primary is unavailable
export const FALLBACK_CHAT_MODEL = HAIKU;

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: DEFAULT_CHAT_MODEL,
    name: "Claude Sonnet",
    provider: DEFAULT_CHAT_MODEL.split("/")[0],
    description: "Fast coaching — used during workspace build sessions",
  },
];

// Model aliases for different Seedforge contexts
export const COACHING_MODEL = DEFAULT_CHAT_MODEL;
export const PROJECT_GENERATION_MODEL = "anthropic/claude-opus-4-6";
export const TITLE_MODEL = DEFAULT_CHAT_MODEL;
