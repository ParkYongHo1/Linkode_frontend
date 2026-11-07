"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/shared/api/supabase/server";

export type LoginState = {
  error: string | null;
  email: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email ||
    !password
  ) {
    return {
      error: "이메일과 비밀번호를 입력해주세요.",
      email: typeof email === "string" ? email : "",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "이메일 또는 비밀번호가 맞지 않아요.", email };
  }

  redirect("/problems");
}
