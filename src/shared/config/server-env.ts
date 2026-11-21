import "server-only";

import { requireEnv } from "./require-env";

export const SUPABASE_SECRET_KEY = requireEnv(
  process.env.SUPABASE_SECRET_KEY,
  "SUPABASE_SECRET_KEY",
);

export const AI_BASE_URL = requireEnv(process.env.AI_BASE_URL, "AI_BASE_URL");

export const AI_API_KEY = requireEnv(process.env.AI_API_KEY, "AI_API_KEY");

export const AI_MODEL = requireEnv(process.env.AI_MODEL, "AI_MODEL");
