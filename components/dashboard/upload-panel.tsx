"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Video,
  X,
  FileVideo,
  AlertCircle,
  CheckCircle2,
  Cloud,
} from "lucide-react";
import { useVideoStore } from "@/lib/store";
import { validateVideoFile, formatFileSize } from "@/lib/utils";

export function UploadPanel() {
  const {
    uploadedFile,
    setUploadedFile,
    uploadProgress,
    setUploadProgress,
    isUploading,
    setIsUploading,
    setUploadId,
    resetAll,
  } = useVideoStore();

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      const validationError = validateVideoFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      // FIX: Use a local variable to track progress to satisfy TypeScript's number requirement
      let currentProgress = 0;

      // Simulate progress while actually uploading
      const progressInterval = setInterval(() => {
        if (currentProgress >= 85) {
          clearInterval(progressInterval);
        } else {
          currentProgress += Math.random() * 12;
          // Cap it at 85 so it doesn't jump past it
          if (currentProgress > 85) {
            currentProgress = 85;
          }
          // Now we are passing a strict number instead of a function
          setUploadProgress(currentProgress);
        }
      }, 200);

      try {
        const formData = new FormData();
        formData.append("video", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Upload failed");
        }

        const data = await response.json();
        setUploadId(data.uploadId);
        setUploadedFile(file);
        setIsUploading(false);
      } catch (err) {
        clearInterval(progressInterval);
        setIsUploading(false);
        setUploadProgress(0);
        setError(
          err instanceof Error ? err.message : "Upload failed. Please try again."
        );
      }
    },
    [setIsUploading, setUploadProgress, setUploadedFile, setUploadId]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const removeFile = useCallback(() => {
    resetAll();
    setError(null);
  }, [resetAll]);

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center">
          <Upload className="w-3.5 h-3.5 text-purple-400" />
        </div>
        Upload Video
      </h2>

      <AnimatePresence mode="wait">
        {/* Dropzone */}
        {!uploadedFile && !isUploading && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${isDragging
                ? "border-purple-500 bg-purple-500/10 scale-[1.01]"
                : "border-border hover:border-purple-500/40 hover:bg-purple-500/5"
              }`}
          >
            <input
              type="file"
              accept="video/*"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <motion.div
              animate={{ y: isDragging ? -4 : 0 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{
                  scale: isDragging ? 1.1 : 1,
                  rotate: isDragging ? -5 : 0,
                }}
                className="w-14 h-14 rounded-2xl gradient-button flex items-center justify-center shadow-xl shadow-purple-500/30"
              >
                {isDragging ? (
                  <Cloud className="w-7 h-7 text-white" />
                ) : (
                  <Video className="w-7 h-7 text-white" />
                )}
              </motion.div>
              <div>
                <p className="font-semibold text-sm mb-1">
                  {isDragging
                    ? "Drop your video here!"
                    : "Drag & drop your video"}
                </p>
                <p className="text-xs text-muted-foreground">
                  or{" "}
                  <span className="text-purple-400 hover:text-purple-300 transition-colors">
                    click to browse
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                {["MP4", "WebM", "MOV", "AVI"].map((fmt) => (
                  <span
                    key={fmt}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-medium"
                  >
                    {fmt}
                  </span>
                ))}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-medium">
                  max 500MB
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Uploading state */}
        {isUploading && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="glass-card rounded-2xl p-5 border border-purple-500/15"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <Cloud className="w-5 h-5 text-purple-400" />
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Uploading video...</p>
                <p className="text-xs text-muted-foreground">
                  {uploadProgress.toFixed(0)}% complete
                </p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-button progress-shimmer rounded-full"
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Uploaded state */}
        {uploadedFile && !isUploading && (
          <motion.div
            key="uploaded"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="glass-card rounded-2xl p-4 border border-green-500/15"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
                <FileVideo className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                  <p className="text-xs text-green-400">
                    {formatFileSize(uploadedFile.size)} · Ready to process
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1.5 rounded-lg hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}