import { createClient } from "@/shared/api/supabase/server";

import { AccountButton } from "./account-button";
import { GuestActions } from "./guest-actions";

export async function HeaderActions() {

  return <GuestActions />;
}
