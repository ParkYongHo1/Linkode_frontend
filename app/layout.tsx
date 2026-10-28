import type { Metadata } from "next";

import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "Linkode",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
