"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/shared/api/supabase/server";

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut({ scope: "local" });

  redirect("/login");
}
