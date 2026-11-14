"use server";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/entities/session";
import { createClient } from "@/shared/api/supabase/server";

export async function demoLogin() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/problems");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw new Error(`체험 계정 로그인 실패: ${error.message}`);
  }

  redirect("/problems");
}
