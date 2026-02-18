import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, Sparkles, Loader2 } from 'lucide-react';

interface BillingProps {
    user: any;
}

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        price: '29',
        credits: '1,000',
        features: ['1,000 HD Renders', 'Basic Templates', 'Email Support'],
        color: '#2997FF',
    },
    {
        id: 'growth',
        name: 'Growth',
        price: '99',
        credits: '5,000',
        features: ['5,000 HD Renders', 'Premium Templates', 'Priority Support', 'API Access'],
        color: '#BF5AF2',
        popular: true,
    },
    {
        id: 'scale',
        name: 'Scale',
        price: '299',
        credits: '20,000',
        features: ['20,000 HD Renders', 'Custom Branding', 'dedicated Support', 'Unlimited API'],
        color: '#32D74B',
    },
];

export const Billing: React.FC<BillingProps> = ({ user }) => {
    const [loading, setLoading] = useState<string | null>(null);

    const handlePurchase = async (planId: string) => {
        setLoading(planId);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            const response = await fetch(`${apiUrl}/v1/checkout/create-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    userEmail: user.email,
                    planId,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("Failed to create checkout session");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Error initiating payment. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Simple, usage-based pricing</h2>
                <p className="text-[#86868B] text-lg">Choose the plan that fits your production needs.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`relative bg-[#1D1D1F] rounded-3xl border ${plan.popular ? 'border-[#2997FF]/50 ring-1 ring-[#2997FF]/50' : 'border-white/[0.06]'
                            } p-8 flex flex-col`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2997FF] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-[20px] font-semibold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">${plan.price}</span>
                                <span className="text-[#86868B]">/month</span>
                            </div>
                            <p className="mt-4 text-[14px] text-[#2997FF] font-medium flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {plan.credits} Credits included
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-[14px] text-[#F5F5F7]/90">
                                    <div className="w-5 h-5 rounded-full bg-white/[0.04] flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-[#32D74B]" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handlePurchase(plan.id)}
                            disabled={loading !== null}
                            className={`w-full py-3 rounded-xl text-[15px] font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${plan.popular
                                    ? 'bg-[#2997FF] text-white hover:bg-[#2997FF]/90'
                                    : 'bg-white text-black hover:bg-white/90'
                                } disabled:opacity-50`}
                        >
                            {loading === plan.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <CreditCard className="w-4 h-4" />
                            )}
                            Get Started
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 bg-[#1D1D1F]/50 rounded-3xl border border-white/[0.06] p-8 text-center">
                <p className="text-[14px] text-[#86868B]">
                    Need a custom plan? <a href="mailto:hello@rcstudio.com" className="text-[#2997FF] hover:underline">Contact sales</a> for enterprise volume.
                </p>
            </div>
        </div>
    );
};
