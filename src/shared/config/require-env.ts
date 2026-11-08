export function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `환경변수 ${name}이(가) 설정되지 않았어요. .env.local을 확인해주세요.`,
    );
  }
  return value;
}
