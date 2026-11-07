import { connection } from "next/server";

import { createClient } from "@/shared/api/supabase/server";

import { AccountMenu } from "./account-menu";
import { GuestActions } from "./guest-actions";

export async function HeaderActions() {
  await connection();

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const claims = data?.claims;

  if (!claims) {
    return <GuestActions />;
  }

  const initial = claims.email?.[0]?.toUpperCase();

  return <AccountMenu email={claims.email} initial={initial} />;
}
