"use client"

import React from "react"
import { landingGutterClass } from "@/components/landing/landing-frame"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-background text-zinc-900 dark:text-zinc-100 flex flex-col">
      <SiteHeader />
      
      <main className={`flex-grow w-full py-32 md:py-40 ${landingGutterClass}`}>
        <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12">Last updated: June 20, 2026</p>

        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">1. Introduction</h2>
            <p>
              Welcome to Componentry. We respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website (componentry.com).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We only collect information that is necessary to provide and improve our services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Usage Data:</strong> We may use privacy-friendly analytics tools (like Vercel Analytics) to collect anonymized data about how you interact with our website, such as pages visited, time spent, and referring sites.
              </li>
              <li>
                <strong>Communication Data:</strong> If you contact us directly via email or social media, we will receive your contact information and the contents of your message.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide, maintain, and improve our website and UI library.</li>
              <li>To understand and analyze how you use our website.</li>
              <li>To respond to your comments, questions, and requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">4. Third-Party Services</h2>
            <p>
              We may use third-party services for hosting, analytics, and infrastructure. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address. This data is subject to the privacy policies of those respective third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">5. Cookies</h2>
            <p>
              Componentry uses minimal cookies essential for the functionality of the site (such as saving your theme preferences). We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">6. Security</h2>
            <p>
              We value your trust in providing us your information, thus we strive to use commercially acceptable means of protecting it. However, remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">7. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at hello@componentry.fun or via Twitter/X at @harshjdhv.
            </p>
          </section>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
