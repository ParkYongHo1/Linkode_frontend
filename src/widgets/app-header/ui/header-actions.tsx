import { createClient } from "@/shared/api/supabase/server";

import { AccountButton } from "./account-button";
import { GuestActions } from "./guest-actions";

export async function HeaderActions() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const claims = data?.claims;

  if (!claims) {
    return <GuestActions />;
  }

  const initial = claims.email?.[0]?.toUpperCase();

  return <AccountButton initial={initial} />;
}
