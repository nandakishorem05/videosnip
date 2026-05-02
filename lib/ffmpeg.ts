/**
 * FFmpeg Integration Utilities
 *
 * This module contains helper functions for FFmpeg video processing.
 * In production, heavy FFmpeg operations run on an external VPS (not Vercel).
 *
 * Architecture:
 * - Next.js on Vercel: handles upload, auth, API gateway
 * - External Node.js VPS: runs actual FFmpeg commands
 * - Cloud Storage (S3/Vercel Blob): stores input/output files
 */

export interface ProcessingJob {
  uploadId: string;
  inputPath: string;
  outputDir: string;
  options: FFmpegOptions;
}

export interface FFmpegOptions {
  convertToVertical: boolean;
  trimStart: number; // percentage 0-100
  trimEnd: number; // percentage 0-100
  addCaptions: boolean;
  captionText?: string;
  extractAudio: boolean;
  videoDuration?: number; // seconds
}

export interface ProcessedClip {
  id: string;
  name: string;
  type: "reel" | "short" | "tiktok" | "audio";
  duration: string;
  url: string;
  size: string;
  thumbnail?: string;
}

/**
 * Build FFmpeg command for vertical conversion (9:16)
 * Uses center crop to maintain video quality
 */
export function buildVerticalConvertCommand(
  inputPath: string,
  outputPath: string
): string {
  // Scale up and center-crop to 1080x1920 (9:16)
  return `ffmpeg -i "${inputPath}" \
    -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920:(iw-1080)/2:(ih-1920)/2" \
    -c:v libx264 -preset fast -crf 23 \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "${outputPath}"`;
}

/**
 * Build FFmpeg command for video trimming
 */
export function buildTrimCommand(
  inputPath: string,
  outputPath: string,
  startSeconds: number,
  endSeconds: number
): string {
  const duration = endSeconds - startSeconds;
  return `ffmpeg -i "${inputPath}" \
    -ss ${startSeconds.toFixed(2)} \
    -t ${duration.toFixed(2)} \
    -c:v libx264 -preset fast -crf 23 \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "${outputPath}"`;
}

/**
 * Build FFmpeg command for caption overlay
 */
export function buildCaptionCommand(
  inputPath: string,
  outputPath: string,
  captionText: string = "Created with ClipBoost"
): string {
  // Escape special characters in caption text
  const escapedText = captionText.replace(/[:\\]/g, "\\$&").replace(/'/g, "'\\''");

  return `ffmpeg -i "${inputPath}" \
    -vf "drawtext=text='${escapedText}':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.6:boxborderw=10:x=(w-text_w)/2:y=h-th-80:font=Arial" \
    -c:v libx264 -preset fast -crf 23 \
    -c:a copy \
    -movflags +faststart \
    "${outputPath}"`;
}

/**
 * Build FFmpeg command for audio extraction
 */
export function buildAudioExtractCommand(
  inputPath: string,
  outputPath: string
): string {
  return `ffmpeg -i "${inputPath}" \
    -vn \
    -acodec libmp3lame \
    -q:a 2 \
    -ar 44100 \
    "${outputPath}"`;
}

/**
 * Build a chained FFmpeg command combining multiple operations
 * This is more efficient than running separate commands
 */
export function buildChainedCommand(
  inputPath: string,
  outputPath: string,
  options: FFmpegOptions
): string {
  const filters: string[] = [];
  let timeArgs = "";

  // Trimming
  if (options.trimStart > 0 || options.trimEnd < 100) {
    const duration = options.videoDuration || 60;
    const startTime = (options.trimStart / 100) * duration;
    const endTime = (options.trimEnd / 100) * duration;
    timeArgs = `-ss ${startTime.toFixed(2)} -t ${(endTime - startTime).toFixed(2)}`;
  }

  // Vertical conversion
  if (options.convertToVertical) {
    filters.push(
      "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920:(iw-1080)/2:(ih-1920)/2"
    );
  }

  // Captions
  if (options.addCaptions && options.captionText) {
    const escapedText = options.captionText.replace(/[:\\]/g, "\\$&");
    filters.push(
      `drawtext=text='${escapedText}':fontcolor=white:fontsize=42:box=1:boxcolor=black@0.6:boxborderw=8:x=(w-text_w)/2:y=h-th-60`
    );
  }

  const filterStr =
    filters.length > 0 ? `-vf "${filters.join(",")}"` : "";

  return `ffmpeg ${timeArgs} -i "${inputPath}" \
    ${filterStr} \
    -c:v libx264 -preset fast -crf 23 \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "${outputPath}"`;
}

/**
 * Example Express.js server code for the external VPS
 * This should run on your Node.js VPS, NOT on Vercel
 */
export const VPS_SERVER_EXAMPLE = `
// server.js — Run this on your external Node.js VPS
const express = require('express');
const { exec } = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET_KEY || 'change-me';

// Auth middleware
app.use((req, res, next) => {
  if (req.headers['x-secret-key'] !== SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Process video endpoint
app.post('/process', upload.single('video'), (req, res) => {
  const { convertToVertical, trimStart, trimEnd, addCaptions, extractAudio, duration } = req.body;
  const inputPath = req.file.path;
  const jobId = uuidv4();
  const outputDir = path.join('outputs', jobId);
  fs.mkdirSync(outputDir, { recursive: true });

  const outputs = [];

  // Build and run FFmpeg commands
  // ... (see buildChainedCommand in ffmpeg.ts)

  res.json({ jobId, status: 'processing' });
});

app.get('/status/:jobId', (req, res) => {
  // Return job status
});

app.get('/download/:jobId/:file', (req, res) => {
  // Serve processed files
});

app.listen(PORT, () => console.log('FFmpeg server running on port ' + PORT));
`;

/**
 * Estimate processing time based on video duration and options
 */
export function estimateProcessingTime(
  videoDurationSeconds: number,
  options: FFmpegOptions
): number {
  let multiplier = 1;
  if (options.convertToVertical) multiplier += 0.5;
  if (options.addCaptions) multiplier += 0.3;
  if (options.extractAudio) multiplier += 0.1;

  // Rough estimate: video duration * multiplier / 4 (typical processing speed)
  return Math.ceil((videoDurationSeconds * multiplier) / 4);
}
