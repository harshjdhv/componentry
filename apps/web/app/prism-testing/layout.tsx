import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prism",
  description: "Interactive glass prism that splits a light beam into a rainbow.",
  robots: { index: false, follow: false },
};

export default function PrismTestingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
