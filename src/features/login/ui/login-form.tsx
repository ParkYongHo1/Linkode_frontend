"use client";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <form className="mt-10 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-muted-foreground"
        >
          이메일
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-muted-foreground"
          >
            비밀번호
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-strong hover:underline"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={isVisible ? "text" : "password"}
            autoComplete="current-password"
            placeholder="비밀번호 입력"
            className="pr-16"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
            className="absolute top-0.5 right-0.5 size-11 text-subtle hover:bg-transparent hover:text-muted-foreground"
          >
            {isVisible ? (
              <EyeOff aria-hidden="true" className="size-5" />
            ) : (
              <Eye aria-hidden="true" className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-2 h-13 text-base">
        로그인
      </Button>
    </form>
  );
}
