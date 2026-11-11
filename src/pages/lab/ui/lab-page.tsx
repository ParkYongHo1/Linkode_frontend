import { Suspense } from "react";

import { LabWorkspace } from "./lab-workspace";

export function LabPage({ params }: PageProps<"/problems/[id]">) {
  return (
    <Suspense fallback={<div className="flex-1" />}>
      <LabWorkspace params={params} />
    </Suspense>
  );
}
