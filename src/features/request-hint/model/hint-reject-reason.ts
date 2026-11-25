export const HINT_REJECT_REASONS = [
  "in_progress",
  "already_opened",
  "stage_locked",
  "quota_exceeded",
] as const;

export type HintRejectReason = (typeof HINT_REJECT_REASONS)[number];

export function isHintRejectReason(value: string): value is HintRejectReason {
  return (HINT_REJECT_REASONS as readonly string[]).includes(value);
}
