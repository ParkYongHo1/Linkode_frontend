import "server-only";

import { cache } from "react";

import { createClient } from "@/shared/api/supabase/server";

export type CurrentUser = {
  id: string;
  email: string | undefined;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const claims = data?.claims;

  if (!claims) {
    return null;
  }

  return {
    id: claims.sub,
    email: claims.email,
  };
});
