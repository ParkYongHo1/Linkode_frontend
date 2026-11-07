import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md border border-input bg-background px-3.5 text-base text-foreground transition-[color,box-shadow] outline-none placeholder:text-subtle",
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
