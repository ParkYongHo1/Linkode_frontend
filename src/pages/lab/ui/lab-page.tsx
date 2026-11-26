import { Suspense } from "react";

import { LabSkeleton } from "./lab-skeleton";
import { LabWorkspace } from "./lab-workspace";

export function LabPage({ params }: PageProps<"/problems/[id]">) {
  return (
    <Suspense fallback={<LabSkeleton />}>
      <LabWorkspace params={params} />
    </Suspense>
  );
}
