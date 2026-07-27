import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blocks | Componentry",
  description:
    "Production-ready Componentry blocks with live previews, source code, themes, and shadcn install commands.",
};

export default function BlocksPage() {
  redirect("/blocks/hero-section");
}
