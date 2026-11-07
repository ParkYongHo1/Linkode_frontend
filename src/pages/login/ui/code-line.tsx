import { cn } from "@/shared/lib/utils";

type CodeLineProps = {
  number?: number;
  text: string;
  tone?: "normal" | "error" | "added" | "removed";
};

const TONE_CLASS = {
  normal: "",
  error: "bg-destructive-weak shadow-[inset_2px_0_0_var(--destructive)]",
  added: "bg-success/10 shadow-[inset_2px_0_0_var(--success)]",
  removed: "bg-destructive-weak text-muted-foreground shadow-[inset_2px_0_0_var(--destructive)]",
};

const SIGN = { normal: "", error: "", added: "+", removed: "−" };

export function CodeLine({ number, text, tone = "normal" }: CodeLineProps) {
  return (
    <div className={cn("flex whitespace-pre", TONE_CLASS[tone])}>
      <span className="w-10 shrink-0 pr-2 text-right text-subtle">{number}</span>
      <span className={cn("w-5 shrink-0 text-center", tone === "added" ? "text-success" : "text-destructive")}>
        {SIGN[tone]}
      </span>
      <span>{text}</span>
    </div>
  );
}
