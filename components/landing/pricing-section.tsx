"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out ClipBoost",
    features: [
      "5 videos per month",
      "720p output quality",
      "Basic trimming",
      "Watermark included",
      "Convert to vertical",
      "Community support",
    ],
    locked: ["Auto captions", "Audio extraction", "Batch processing"],
    cta: "Get Started Free",
    href: "/dashboard",
    popular: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious content creators",
    features: [
      "Unlimited videos",
      "4K output quality",
      "AI smart crop",
      "Auto captions",
      "No watermark",
      "Audio extraction",
      "Batch processing",
      "Priority processing",
      "Email support",
    ],
    locked: [],
    cta: "Upgrade to Pro",
    href: "/dashboard",
    popular: true,
    badge: "Most Popular",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold text-purple-400 tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full glass-card border border-purple-500/15">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight">
            <span className="text-foreground">Simple, </span>
            <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose the plan that works best for you. Upgrade or cancel anytime —
            no lock-ins.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? "glass border border-purple-500/40 glow-purple"
                  : "glass-card border border-white/5 hover:border-white/10"
              }`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full gradient-button text-xs font-semibold text-white shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span
                    className={`text-5xl font-bold ${
                      plan.popular ? "gradient-text" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Included features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.popular
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Locked features (Free plan) */}
              {plan.locked.length > 0 && (
                <ul className="space-y-3 mb-6 pb-6 border-b border-white/5">
                  {plan.locked.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-muted/40">
                        <Lock className="w-2.5 h-2.5 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground line-through">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA button */}
              <Link href={plan.href} className="block">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={`w-full py-5 font-semibold text-base ${
                      plan.popular
                        ? "gradient-button border-0 text-white shadow-lg shadow-purple-500/25"
                        : "bg-secondary hover:bg-secondary/70 border border-white/5 text-foreground"
                    }`}
                  >
                    {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                    {plan.cta}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground"
        >
          {[
            "✓ No credit card required",
            "✓ Cancel anytime",
            "✓ GDPR compliant",
            "✓ 99.9% uptime SLA",
          ].map((item, i) => (
            <span key={i} className="text-sm text-muted-foreground/70">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
