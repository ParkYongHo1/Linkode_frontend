import { DemoLoginButton } from "@/features/demo-login";

export function DemoEntry() {
  return (
    <div className="mt-8 flex flex-col gap-2.5">
      <h2 className="text-sm font-semibold text-muted-foreground">가입 없이 둘러보기</h2>
      <DemoLoginButton />
      <p className="text-[13px] leading-5 text-muted-foreground">
        체험 계정으로는 코드 저장과 AI 힌트까지 써볼 수 있어요. 체험 데이터는 매일 새벽 4시에 초기화돼요.
      </p>
    </div>
  );
}
