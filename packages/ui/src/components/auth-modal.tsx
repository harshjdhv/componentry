"use client"

import * as React from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, Mail, ArrowRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

// Dummy icons for Google and Microsoft as Lucide doesn't have them
const GoogleIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
)

const MicrosoftIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 88 88" className={className}>
        <path fill="#f35325" d="M0 0h42v42H0z" />
        <path fill="#81bc06" d="M46 0h42v42H46z" />
        <path fill="#05a6f0" d="M0 46h42v42H0z" />
        <path fill="#ffba08" d="M46 46h42v42H46z" />
    </svg>
)

const AppleIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="#1DA1F2" />
    </svg>
)

const GitHubIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
)

interface AuthModalProps {
    /**
     * The text to display on the trigger button
     */
    triggerText?: string
    /**
     * Callback when login is attempted
     */
    onLogin?: (provider: string) => void
    /**
     * Optional className for the trigger button
     */
    className?: string
}

function AuthModal({
    triggerText = "Sign up / Sign in",
    onLogin,
    className
}: AuthModalProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [email, setEmail] = React.useState("")

    const container: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    const socialButtons = [
        { icon: GoogleIcon, label: "Google", color: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
        { icon: AppleIcon, label: "Apple", color: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
        { icon: MicrosoftIcon, label: "Microsoft", color: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
        { icon: GitHubIcon, label: "Github", color: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
        { icon: TwitterIcon, label: "Twitter", color: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
    ]

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300",
                    className
                )}
            >
                {triggerText}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm dark:bg-zinc-950/40"
                        />

                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="relative w-full max-w-[360px] overflow-hidden rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 ring-1 ring-zinc-950/5"
                        >
                            <div className="absolute right-4 top-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 dark:hover:bg-zinc-900"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <motion.div variants={item} className="mb-8 text-center">
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    Welcome back
                                </h2>
                                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    Sign in to your account to continue
                                </p>
                            </motion.div>

                            <motion.div variants={item} className="grid grid-cols-5 gap-3 mb-8">
                                {socialButtons.map((btn, i) => (
                                    <button
                                        key={i}
                                        onClick={() => onLogin?.(btn.label)}
                                        className={cn(
                                            "flex aspect-square items-center justify-center rounded-2xl border border-zinc-200 bg-white transition-all hover:scale-105 active:scale-95 dark:border-zinc-800 dark:bg-zinc-950",
                                            btn.color
                                        )}
                                        aria-label={`Sign in with ${btn.label}`}
                                    >
                                        <btn.icon className="h-5 w-5" />
                                    </button>
                                ))}
                            </motion.div>

                            <motion.div variants={item} className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-zinc-400 dark:bg-zinc-950">
                                        Or continue with email
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div variants={item}>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="h-10 w-full rounded-full border border-zinc-200 bg-zinc-50 pl-10 pr-10 text-sm outline-none transition-all focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:focus:border-zinc-100 dark:focus:bg-zinc-900"
                                    />
                                    <button
                                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 flex items-center justify-center bg-zinc-900 text-zinc-50 transition-transform hover:scale-95 active:scale-90 dark:bg-zinc-50 dark:text-zinc-900"
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div variants={item} className="mt-8 text-center">
                                <p className="text-xs text-zinc-400">
                                    By clicking continue, you agree to our{" "}
                                    <a href="#" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
                                        Privacy Policy
                                    </a>
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export { AuthModal, type AuthModalProps }
