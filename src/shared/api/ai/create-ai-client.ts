import "server-only";

import OpenAI from "openai";

import { AI_API_KEY, AI_BASE_URL } from "@/shared/config/server-env";

export function createAiClient() {
  return new OpenAI({ baseURL: AI_BASE_URL, apiKey: AI_API_KEY });
}
