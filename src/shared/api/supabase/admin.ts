import "server-only";

import { createClient } from "@supabase/supabase-js";

import { SUPABASE_URL } from "@/shared/config/env";
import { SUPABASE_SECRET_KEY } from "@/shared/config/server-env";

import type { Database } from "./database-types";

export function createAdminClient() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
