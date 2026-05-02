"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Video, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const floatingCards = [
  {
    label: "Reel #1",
    sublabel: "Instagram",
    color: "from-purple-500 to-pink-500",
    delay: 0,
    animate: { y: [0, -18, 0] },
    duration: 5,
    position: "absolute top-8 right-4 w-28 h-48",
  },
  {
    label: "Short #2",
    sublabel: "YouTube",
    color: "from-blue-500 to-cyan-500",
    delay: 0.8,
    animate: { y: [0, 15, 0] },
    duration: 4.5,
    position: "absolute bottom-12 right-14 w-24 h-40",
  },
  {
    label: "TikTok",
    sublabel: "Clip",
    color: "from-indigo-500 to-violet-500",
    delay: 1.5,
    animate: { y: [0, -12, 0] },
    duration: 5.5,
    position: "absolute top-24 left-2 w-22 h-36",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/8 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-purple-500/20"
            >
              <div className="relative">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 opacity-50" />
                </div>
              </div>
              <span className="text-xs font-medium text-purple-300">
                AI-Powered Video Repurposing
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight"
            >
              <span className="text-foreground">Turn </span>
              <span className="gradient-text">1 Video</span>
              <br />
              <span className="text-foreground">Into </span>
              <span className="gradient-text">10 Viral</span>
              <br />
              <span className="text-foreground/80 text-4xl sm:text-5xl lg:text-6xl font-semibold">
                Clips
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Transform long-form content into engaging Reels, Shorts, and
              TikToks. Built for creators and small businesses who want to grow
              without the grind.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="gradient-button border-0 text-white font-semibold px-8 py-6 text-base group shadow-xl shadow-purple-500/25 w-full sm:w-auto"
                  >
                    Upload Video Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-card border-white/10 px-8 py-6 text-base group hover:border-purple-500/30 w-full sm:w-auto"
                >
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {[
                { label: "Videos Processed", value: "50K+", icon: Video },
                { label: "Clips Generated", value: "500K+", icon: Zap },
                { label: "Happy Creators", value: "10K+", icon: TrendingUp },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 border border-white/5">
                  <stat.icon className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-lg font-bold gradient-text leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content — Floating Phone Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-[540px]">
              {/* Central phone card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-[400px] glass rounded-3xl overflow-hidden glow-purple border border-purple-500/20"
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-blue-500/20 flex flex-col items-center justify-center p-6">
                  {/* Phone notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/60 rounded-full" />
                  <div className="mt-6 text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-button flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/40">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Original Video</p>
                    <p className="text-xs text-muted-foreground mt-1">16:9 Landscape</p>
                    <div className="mt-4 flex items-center justify-center gap-1">
                      <div className="w-16 h-1.5 rounded-full bg-purple-500/40" />
                      <div className="w-8 h-1.5 rounded-full bg-blue-500/40" />
                      <div className="w-12 h-1.5 rounded-full bg-indigo-500/40" />
                    </div>
                  </div>
                  {/* Arrow indicator */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Processing</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating output cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  animate={{ y: card.animate.y }}
                  transition={{
                    duration: card.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay,
                  }}
                  className={`${card.position} glass-card rounded-2xl overflow-hidden border border-white/8`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${card.color} opacity-25 absolute inset-0`}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div
                      className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-2 shadow-lg`}
                    >
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-center text-foreground">
                      {card.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {card.sublabel}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Processing badge */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card rounded-xl px-4 py-2.5 border border-green-500/20 flex items-center gap-2 whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-400">
                  3 clips generated ✓
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
