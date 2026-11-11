import { Suspense } from "react";

import { AppHeader, HeaderActions, MainNav } from "@/widgets/app-header";

export default function LabLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <AppHeader
        nav={<MainNav />}
        actions={
          <Suspense fallback={null}>
            <HeaderActions />
          </Suspense>
        }
      />
      {children}
    </div>
  );
}
