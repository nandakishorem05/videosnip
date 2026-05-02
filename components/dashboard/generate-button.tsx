"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Zap, AlertTriangle } from "lucide-react";
import { useVideoStore, type VideoClip } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PROCESSING_STEPS = [
  "Analyzing video content...",
  "Applying FFmpeg pipeline...",
  "Converting to vertical format...",
  "Generating clips...",
  "Optimizing output quality...",
  "Finalizing your clips...",
];

export function GenerateButton() {
  const {
    uploadedFile,
    uploadId,
    isProcessing,
    setIsProcessing,
    setProcessingProgress,
    processingProgress,
    processingStep,
    setProcessingStep,
    setGeneratedClips,
    options,
  } = useVideoStore();

  const handleGenerate = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a video first");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    // Animate through processing steps
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < PROCESSING_STEPS.length) {
        setProcessingStep(PROCESSING_STEPS[stepIndex]);
        stepIndex++;
      }
    }, 800);

    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 6;
      if (progress >= 95) {
        clearInterval(progressInterval);
        progress = 95;
      }
      setProcessingProgress(Math.min(progress, 95));
    }, 300);

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uploadId: uploadId || `local_${Date.now()}`,
          fileName: uploadedFile.name,
          options: {
            convertToVertical: options.convertToVertical,
            trimStart: options.trimStart,
            trimEnd: options.trimEnd,
            addCaptions: options.addCaptions,
            captionText: options.captionText,
            extractAudio: options.extractAudio,
          },
        }),
      });

      clearInterval(progressInterval);
      clearInterval(stepInterval);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Processing failed");
      }

      const data = await response.json();

      // Animate to 100%
      setProcessingProgress(100);
      setProcessingStep("Done!");
      await new Promise((r) => setTimeout(r, 400));

      const clips: VideoClip[] = data.clips.map((c: VideoClip) => ({
        id: c.id,
        name: c.name,
        duration: c.duration,
        type: c.type,
        url: c.url,
        size: c.size,
      }));

      setGeneratedClips(clips);
      setIsProcessing(false);
      toast.success(`🎉 ${clips.length} clips generated successfully!`, {
        description: "Your clips are ready to download.",
      });
    } catch (error) {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      setIsProcessing(false);
      setProcessingProgress(0);
      setProcessingStep("");
      toast.error("Processing failed", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const isDisabled = !uploadedFile || isProcessing;

  return (
    <div className="space-y-4">
      {/* Main Generate Button */}
      <motion.div
        whileHover={isDisabled ? {} : { scale: 1.02 }}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
      >
        <Button
          onClick={handleGenerate}
          disabled={isDisabled}
          size="lg"
          className={`w-full py-7 text-base font-bold relative overflow-hidden tracking-wide ${
            isDisabled
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "gradient-button border-0 text-white shadow-xl shadow-purple-500/30"
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2 relative z-10">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing... {processingProgress.toFixed(0)}%
            </span>
          ) : (
            <span className="flex items-center gap-2 relative z-10">
              <Sparkles className="w-5 h-5" />
              Generate Clips
              <Zap className="w-4 h-4 opacity-70" />
            </span>
          )}

          {/* Shimmer overlay */}
          {!isDisabled && !isProcessing && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          )}
        </Button>
      </motion.div>

      {/* Progress section */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-button rounded-full progress-shimmer"
                animate={{ width: `${processingProgress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Step indicator */}
            <motion.p
              key={processingStep}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-center text-muted-foreground"
            >
              {processingStep}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warning if no options selected */}
      <AnimatePresence>
        {uploadedFile && !isProcessing && !options.convertToVertical && !options.extractAudio && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/8 border border-yellow-500/15 text-yellow-400"
          >
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p className="text-xs">
              Tip: Enable &quot;Convert to Vertical&quot; to generate Reels, Shorts
              & TikTok clips.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help text */}
      {!uploadedFile && (
        <p className="text-xs text-center text-muted-foreground/60">
          Upload a video above to get started
        </p>
      )}
    </div>
  );
}
