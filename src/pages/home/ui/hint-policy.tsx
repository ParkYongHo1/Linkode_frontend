import { HINT_POLICIES } from "../config/home-features";

export function HintPolicy() {
  return (
    <section
      aria-labelledby="hint-policy-title"
      className="border-t border-border py-14 md:py-20"
    >
      <h2
        id="hint-policy-title"
        className="text-2xl leading-[34px] font-bold tracking-[-0.4px] md:text-[30px] md:leading-[40px] md:tracking-[-0.6px]"
      >
        힌트는 이렇게 써요
      </h2>
      <p className="mt-3 text-[15px] leading-6 text-muted-foreground md:text-base md:leading-[26px]">
        받지 못한 힌트로 횟수가 줄어드는 일은 없어요.
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {HINT_POLICIES.map((policy) => (
          <li
            key={policy.title}
            className="flex flex-col border-t-2 border-foreground pt-4"
          >
            <h3 className="text-lg leading-[27px] font-bold">{policy.title}</h3>
            <p className="mt-1.5 text-[15px] leading-6 text-muted-foreground">
              {policy.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
