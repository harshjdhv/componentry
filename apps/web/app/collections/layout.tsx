import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-background dark:text-zinc-100">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-28 sm:px-8 lg:pt-36">{children}</main>
      <Footer />
    </div>
  )
}
