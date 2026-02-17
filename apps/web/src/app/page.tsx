import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center font-bold text-xl" href="#">
                    AgentCanvas
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Features
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Pricing
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Docs
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Give Your AI Agents Visual Superpowers
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    The first media generation infrastructure designed for autonomous agents.
                                    Generate branded social posts, videos, and stories via API.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/dashboard">
                                    <Button size="lg">Get Started</Button>
                                </Link>
                                <Button variant="outline" size="lg">Read Documentation</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-xl font-bold">API First</h3>
                                <p className="text-gray-500 dark:text-gray-400">Designed for developers. Integrate with n8n, LangChain, or your own code in minutes.</p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-xl font-bold">Pixel Perfect</h3>
                                <p className="text-gray-500 dark:text-gray-400">Deterministic rendering ensures your brand fonts, colors, and logos are always respected.</p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-xl font-bold">Video Ready</h3>
                                <p className="text-gray-500 dark:text-gray-400">Generate 1080p video with animations, transitions, and audio using React components.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2026 AgentCanvas. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}
