"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Smartphone,
  Subtitles,
  Music,
  Zap,
  Cloud,
  Clock,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Vertical Conversion",
    description:
      "Auto-convert horizontal videos to 9:16 format with smart center-crop via FFmpeg.",
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/20",
  },
  {
    icon: Scissors,
    title: "Smart Trimming",
    description:
      "Precise video trimming with an intuitive dual-handle slider UI.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
  },
  {
    icon: Subtitles,
    title: "Auto Captions",
    description:
      "Generate engaging caption overlays for better accessibility and engagement.",
    gradient: "from-indigo-500 to-purple-500",
    glow: "shadow-indigo-500/20",
  },
  {
    icon: Music,
    title: "Audio Extraction",
    description:
      "Extract high-quality audio tracks from your videos as MP3 instantly.",
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized FFmpeg pipeline for quick turnaround — most clips in under 2 minutes.",
    gradient: "from-yellow-500 to-orange-500",
    glow: "shadow-yellow-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud Processing",
    description:
      "All heavy lifting happens in the cloud. No installs, no lag on your device.",
    gradient: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Clock,
    title: "Batch Processing",
    description:
      "Queue multiple clips at once and let ClipBoost handle the rest. PRO feature.",
    gradient: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/20",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your content is end-to-end encrypted. Files auto-delete after 24 hours.",
    gradient: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Features() {
  return (
    <section id="features" className="py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-purple-400 tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full glass-card border border-purple-500/15"
          >
            Powerful Features
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight">
            <span className="text-foreground">Everything You Need to </span>
            <span className="gradient-text">Create Content</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Powerful features designed to help you repurpose content faster and
            more efficiently — without any technical knowledge.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-6 glass-card rounded-2xl cursor-pointer transition-colors duration-300 hover:border-white/10 overflow-hidden"
            >
              {/* Hover gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg ${feature.glow} group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="relative text-base font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
