import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nino Electronics Solutions",
  description:
    "Electronics repair platform for ECU repairs, programming, diagnostics, board work, device repairs, and module recovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-transparent text-[var(--foreground)] selection:bg-[rgba(255,122,24,0.3)] selection:text-white">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
