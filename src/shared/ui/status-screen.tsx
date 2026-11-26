import type { ReactNode } from "react";

type StatusScreenProps = {
  code?: string;
  title: string;
  description: string;
  actions: ReactNode;
};

export function StatusScreen({
  code,
  title,
  description,
  actions,
}: StatusScreenProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center">
      {code && (
        <p className="text-[13px] font-semibold tracking-[0.2px] text-subtle tabular-nums">
          {code}
        </p>
      )}
      <h1 className="mt-2 text-2xl leading-[34px] font-bold tracking-[-0.4px]">
        {title}
      </h1>
      <p className="mt-2 max-w-[360px] text-[15px] leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-8 flex w-full max-w-[320px] flex-col gap-2 sm:w-auto sm:max-w-none sm:flex-row">
        {actions}
      </div>
    </main>
  );
}
