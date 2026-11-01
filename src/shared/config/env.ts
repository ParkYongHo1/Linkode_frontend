function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `환경변수 ${name}이(가) 설정되지 않았어요. .env.local을 확인해주세요.`,
    );
  }
  return value;
}

export const SUPABASE_URL = requireEnv(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  "NEXT_PUBLIC_SUPABASE_URL",
);

export const SUPABASE_PUBLISHABLE_KEY = requireEnv(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
);
