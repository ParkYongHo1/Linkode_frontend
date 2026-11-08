const MONTH_DAY = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
});

export function formatMonthDay(value: string): string {
  return MONTH_DAY.format(new Date(value));
}
