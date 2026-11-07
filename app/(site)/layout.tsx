import { Suspense } from "react";

import { AppFooter } from "@/widgets/app-footer";
import { AppHeader, HeaderActions, MainNav } from "@/widgets/app-header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader
        nav={<MainNav />}
        actions={
          <Suspense fallback={null}>
            <HeaderActions />
          </Suspense>
        }
      />
      {children}
      <AppFooter />
    </div>
  );
}
