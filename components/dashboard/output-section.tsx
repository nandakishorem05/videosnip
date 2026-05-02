"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Download,
  Copy,
  Play,
  Film,
  Music2,
  FileVideo,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { useVideoStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { VideoClip, ClipType } from "@/lib/store";

const typeConfig: Record<
  ClipType,
  { icon: React.ElementType; gradient: string; label: string; platform: string }
> = {
  reel: {
    icon: Film,
    gradient: "from-purple-500 to-pink-500",
    label: "Reel",
    platform: "Instagram",
  },
  short: {
    icon: Video,
    gradient: "from-blue-500 to-cyan-500",
    label: "Short",
    platform: "YouTube",
  },
  tiktok: {
    icon: FileVideo,
    gradient: "from-indigo-500 to-violet-500",
    label: "TikTok",
    platform: "TikTok",
  },
  audio: {
    icon: Music2,
    gradient: "from-pink-500 to-rose-500",
    label: "Audio",
    platform: "MP3",
  },
};

interface ClipCardProps {
  clip: VideoClip;
  index: number;
}

function ClipCard({ clip, index }: ClipCardProps) {
  const config = typeConfig[clip.type];
  const Icon = config.icon;

  const handleDownload = () => {
    // In production: trigger actual download from signed URL
    if (clip.url) {
      const a = document.createElement("a");
      a.href = clip.url;
      a.download = clip.name;
      a.click();
    }
    toast.success(`Downloading ${clip.name}`, {
      description: clip.size ? `File size: ${clip.size}` : undefined,
    });
  };

  const handleCopyCaption = () => {
    const captions: Record<ClipType, string> = {
      reel: "✨ New content drop! Save this for later 🔥 #reels #viral #creator",
      short: "📺 Watch till the end! Like & subscribe for more 👇 #shorts #youtube",
      tiktok: "POV: You found the best content 🎯 Follow for daily videos! #tiktok #fyp",
      audio: "🎵 Audio extracted from my latest video. Listen and share!",
    };
    navigator.clipboard.writeText(captions[clip.type]);
    toast.success("Caption copied!", {
      description: "Ready to paste on your platform.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 10 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative clip-card glass-card rounded-2xl overflow-hidden"
      style={{ aspectRatio: clip.type === "audio" ? "1/1" : "9/16" }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20`}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-3 shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <p className="text-xs font-semibold text-center text-foreground leading-tight">
          {clip.name}
        </p>
        <p className="text-[10px] text-muted-foreground mt-1">{clip.duration}</p>
        <div className={`mt-2.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-sm`}>
          {config.platform}
        </div>
        {clip.size && (
          <p className="text-[9px] text-muted-foreground/60 mt-1">{clip.size}</p>
        )}
      </div>

      {/* Play indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
      >
        <Play className="w-3 h-3 text-white ml-0.5" />
      </motion.div>

      {/* Hover actions overlay */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center gap-3 z-20">
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col gap-2.5 w-full px-5"
        >
          <Button
            size="sm"
            onClick={handleDownload}
            className="w-full gradient-button border-0 text-white text-xs font-semibold py-2 shadow-lg"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyCaption}
            className="w-full border-white/10 bg-white/5 text-xs py-2 hover:border-purple-500/30"
          >
            <Copy className="w-3.5 h-3.5 mr-1.5" />
            Copy Caption
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Empty State ────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center text-center p-12 glass-card rounded-2xl border border-dashed border-white/8 min-h-[500px]"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-6 border border-purple-500/15"
      >
        <Video className="w-12 h-12 text-purple-400/60" />
      </motion.div>
      <h3 className="text-lg font-semibold mb-2 text-foreground/80">
        Your Clips Appear Here
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        Upload a video, configure your options, and click{" "}
        <span className="text-purple-400 font-medium">Generate Clips</span> to
        create your short-form content.
      </p>

      {/* Placeholder grid */}
      <div className="grid grid-cols-3 gap-3 mt-8 w-full max-w-xs opacity-30">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[9/16] rounded-xl skeleton"
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Processing Skeleton ────────────────────────── */
function ProcessingSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 }}
          className="aspect-[9/16] rounded-2xl skeleton relative overflow-hidden"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30">
            <div className="w-10 h-10 rounded-xl bg-white/10 skeleton" />
            <div className="w-16 h-2 rounded bg-white/10" />
            <div className="w-10 h-2 rounded bg-white/10" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Preview (file uploaded, not processed) ─────── */
function VideoPreview({ file, options }: { file: File; options: ReturnType<typeof useVideoStore>["options"] }) {
  const videoUrl = URL.createObjectURL(file);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-4 h-full"
    >
      {/* Video preview */}
      <div className="relative aspect-video glass-card rounded-2xl overflow-hidden border border-white/5">
        <video
          src={videoUrl}
          className="w-full h-full object-cover opacity-60"
          muted
          onLoadedMetadata={(e) => URL.revokeObjectURL(videoUrl)}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl shadow-purple-500/40">
            <Play className="w-7 h-7 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-medium text-white/80 truncate glass-card rounded-lg px-3 py-1.5">
            {file.name}
          </p>
        </div>
      </div>

      {/* Settings summary */}
      <div className="glass-card rounded-xl p-4 border border-white/5">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Active Options
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Vertical (9:16)", active: options.convertToVertical },
            { label: "Add Captions", active: options.addCaptions },
            { label: "Extract Audio", active: options.extractAudio },
            {
              label: `Trim: ${options.trimStart}–${options.trimEnd}%`,
              active: options.trimStart > 0 || options.trimEnd < 100,
            },
          ].map(({ label, active }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${active ? "bg-green-400" : "bg-muted-foreground/30"}`}
              />
              <span
                className={`text-xs ${active ? "text-foreground" : "text-muted-foreground/50"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────── */
export function OutputSection() {
  const { generatedClips, isProcessing, uploadedFile, options } = useVideoStore();

  const handleDownloadAll = () => {
    toast.success("Preparing all clips for download...", {
      description: "This may take a moment.",
    });
    generatedClips.forEach((clip, i) => {
      setTimeout(() => {
        if (clip.url) {
          const a = document.createElement("a");
          a.href = clip.url;
          a.download = clip.name;
          a.click();
        }
      }, i * 300);
    });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-base font-semibold flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center">
            {generatedClips.length > 0 ? (
              <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            )}
          </div>
          {isProcessing
            ? "Processing..."
            : generatedClips.length > 0
            ? `Generated Clips (${generatedClips.length})`
            : uploadedFile
            ? "Video Preview"
            : "Preview & Output"}
        </h2>

        {generatedClips.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadAll}
            className="glass-card border-white/8 text-xs hover:border-purple-500/25 py-1.5"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download All
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!uploadedFile && generatedClips.length === 0 && !isProcessing ? (
            <EmptyState key="empty" />
          ) : isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProcessingSkeleton />
            </motion.div>
          ) : generatedClips.length > 0 ? (
            <motion.div
              key="clips"
              className="grid grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {generatedClips.map((clip, index) => (
                  <ClipCard key={clip.id} clip={clip} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : uploadedFile ? (
            <VideoPreview key="preview" file={uploadedFile} options={options} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
