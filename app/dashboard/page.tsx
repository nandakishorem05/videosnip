"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { UploadPanel } from "@/components/dashboard/upload-panel";
import { ProcessingOptions } from "@/components/dashboard/processing-options";
import { GenerateButton } from "@/components/dashboard/generate-button";
import { OutputSection } from "@/components/dashboard/output-section";
import { Sparkles, Video } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[130px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl gradient-button flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Video className="w-4.5 h-4.5 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="gradient-text">Dashboard</span>
              </h1>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full glass-card border border-green-500/20 text-green-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Beta
              </motion.span>
            </div>
            <p className="text-muted-foreground text-sm pl-12">
              Upload your video and transform it into engaging short-form content.
            </p>
          </motion.div>

          {/* Main layout — 4/12 left + 8/12 right */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* ── Left Panel ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex flex-col gap-5"
            >
              {/* Upload */}
              <div className="glass rounded-2xl p-5 border border-white/6">
                <UploadPanel />
              </div>

              {/* Options */}
              <div className="glass rounded-2xl p-5 border border-white/6">
                <ProcessingOptions />
              </div>

              {/* Generate */}
              <div className="glass rounded-2xl p-5 border border-white/6">
                <GenerateButton />
              </div>

              {/* Pro upsell */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl p-5 border border-purple-500/25 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.08) 100%)",
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold gradient-text">
                      Upgrade to Pro
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Unlock unlimited clips, 4K quality, AI smart crop, and
                    priority processing.
                  </p>
                  <div className="mt-3 text-xs font-bold gradient-text">
                    $19/month →
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right Panel ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <div className="glass rounded-2xl p-5 border border-white/6 min-h-[640px] flex flex-col">
                <OutputSection />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
