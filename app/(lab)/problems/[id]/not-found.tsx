import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { StatusScreen } from "@/shared/ui/status-screen";

export default function ProblemNotFound() {
  return (
    <StatusScreen
      code="404"
      title="문제를 찾을 수 없어요"
      description="삭제되었거나 주소가 잘못된 문제예요. 목록에서 다시 골라주세요."
      actions={
        <Button asChild size="lg">
          <Link href="/problems">문제 목록으로</Link>
        </Button>
      }
    />
  );
}
