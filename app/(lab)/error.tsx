"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/shared/ui/button";
import { StatusScreen } from "@/shared/ui/status-screen";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      title="잠시 문제가 생겼어요"
      description="화면을 불러오지 못했어요. 다시 시도하거나 문제 목록으로 돌아가주세요."
      actions={
        <>
          <Button type="button" size="lg" onClick={reset}>
            다시 시도
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/problems">문제 목록으로</Link>
          </Button>
        </>
      }
    />
  );
}
