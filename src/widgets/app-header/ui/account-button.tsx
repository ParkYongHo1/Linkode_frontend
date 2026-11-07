type AccountButtonProps = {
  initial: string;
};

export function AccountButton({ initial }: AccountButtonProps) {
  return (
    <button type="button" aria-label="내 계정" className="flex size-11 items-center justify-center">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary-weak text-[13px] font-semibold text-primary-strong">
        {initial}
      </span>
    </button>
  );
}
