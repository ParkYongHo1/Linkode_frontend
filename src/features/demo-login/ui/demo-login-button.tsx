"use client";

import { useFormStatus } from "react-dom";
import { ChevronRight } from "lucide-react";

import { demoLogin } from "../api/demo-login";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-[52px] w-full items-center justify-between rounded-lg border border-input px-4 text-[15px] font-semibold text-foreground hover:bg-secondary disabled:opacity-60"
    >
      체험 계정으로 둘러보기
      <ChevronRight aria-hidden="true" className="size-4 text-subtle" />
    </button>
  );
}

export function DemoLoginButton() {
  return (
    <form action={demoLogin}>
      <SubmitButton />
    </form>
  );
}
