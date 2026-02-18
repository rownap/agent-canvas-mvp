"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Layers, ArrowRight, Loader2, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push("/dashboard")
        }
    }

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            setError("Check your email for the confirmation link.")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
            {/* Background Blur */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2997FF]/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BF5AF2]/10 blur-[120px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[400px] relative z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="flex items-center gap-2.5 mb-8 group">
                        <div className="w-10 h-10 rounded-[10px] bg-[#2997FF] flex items-center justify-center shadow-[0_0_20px_rgba(41,151,255,0.3)] group-hover:scale-105 transition-transform duration-200">
                            <Layers className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-semibold text-white tracking-tight">AgentCanvas</span>
                    </Link>
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">Welcome back</h1>
                    <p className="text-[14px] text-[#A1A1AA] font-light text-center">
                        The visual engine for autonomous agents.
                    </p>
                </div>

                <div className="bg-[#1D1D1F] rounded-2xl border border-white/[0.08] p-8 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[13px] font-medium text-[#F5F5F7]/80 flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" /> Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2.5 text-[14px] text-white placeholder-[#86868B]/50 focus:outline-none focus:ring-2 focus:ring-[#2997FF]/40 focus:border-[#2997FF]/40 transition-all outline-none"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[13px] font-medium text-[#F5F5F7]/80 flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5" /> Password
                                </label>
                                <button type="button" className="text-[12px] text-[#2997FF] hover:underline">Forgot?</button>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2.5 text-[14px] text-white placeholder-[#86868B]/50 focus:outline-none focus:ring-2 focus:ring-[#2997FF]/40 focus:border-[#2997FF]/40 transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-[12px] text-[#FF375F] bg-[#FF375F]/10 px-3 py-2 rounded-lg border border-[#FF375F]/20">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2997FF] text-white py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#2997FF]/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(41,151,255,0.2)]"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                        </button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/[0.05]"></span>
                            </div>
                            <div className="relative flex justify-center text-[11px] uppercase tracking-widest text-[#86868B]">
                                <span className="bg-[#1D1D1F] px-2 text-[#A1A1AA]">or</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignUp}
                            disabled={loading}
                            className="w-full bg-white/[0.04] text-white border border-white/[0.08] py-2.5 rounded-lg text-[14px] font-medium hover:bg-white/[0.08] transition-all duration-200"
                        >
                            Create Account
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-[12px] text-[#86868B] font-light">
                    By continuing, you agree to AgentCanvas&apos;s <br />
                    <Link href="#" className="underline hover:text-white transition-colors">Terms of Service</Link> and <Link href="#" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
                </p>
            </motion.div>
        </div>
    )
}
