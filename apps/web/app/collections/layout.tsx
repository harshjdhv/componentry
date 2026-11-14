import { landingGutterClass } from "@/components/landing/landing-frame"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-background dark:text-zinc-100">
      <SiteHeader />
      <main className={cn("w-full pb-24 pt-28 lg:pt-36", landingGutterClass)}>{children}</main>
      <Footer />
    </div>
  )
}
