"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/shared/api/supabase/server";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/shared/config/server-env";

export async function demoLogin() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  });

  if (error) {
    throw new Error(`체험 계정 로그인 실패: ${error.message}`);
  }

  redirect("/problems");
}
