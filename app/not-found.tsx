import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { StatusScreen } from "@/shared/ui/status-screen";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <StatusScreen
        code="404"
        title="페이지를 찾을 수 없어요"
        description="주소가 바뀌었거나 없는 페이지예요."
        actions={
          <Button asChild size="lg">
            <Link href="/problems">문제 목록으로</Link>
          </Button>
        }
      />
    </div>
  );
}
