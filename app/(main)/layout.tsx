import { AppHeader, LearnerNav } from "@/widgets/app-header";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <AppHeader nav={<LearnerNav />} />
      {children}
    </>
  );
}
