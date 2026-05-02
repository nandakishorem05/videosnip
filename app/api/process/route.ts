import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import {
  buildChainedCommand,
  buildAudioExtractCommand,
  type FFmpegOptions,
} from "@/lib/ffmpeg";

interface ProcessingRequest {
  uploadId: string;
  fileName: string;
  options: {
    convertToVertical: boolean;
    trimStart: number;
    trimEnd: number;
    addCaptions: boolean;
    captionText?: string;
    extractAudio: boolean;
    videoDuration?: number;
  };
}

/**
 * POST /api/process
 *
 * Handles video processing requests.
 *
 * LOCAL DEV: Runs FFmpeg directly on the machine (requires ffmpeg installed)
 * PRODUCTION: Delegates to external VPS via HTTP request
 *
 * To use production mode, set FFMPEG_SERVER_URL in .env
 */
export async function POST(request: NextRequest) {
  try {
    const body: ProcessingRequest = await request.json();
    const { uploadId, fileName, options } = body;

    if (!uploadId) {
      return NextResponse.json(
        { error: "No upload ID provided" },
        { status: 400 }
      );
    }

    // --- PRODUCTION: Delegate to external FFmpeg VPS ---
    if (process.env.FFMPEG_SERVER_URL) {
      const response = await fetch(
        `${process.env.FFMPEG_SERVER_URL}/process`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-secret-key": process.env.FFMPEG_SERVER_SECRET || "",
          },
          body: JSON.stringify({ uploadId, fileName, options }),
        }
      );

      if (!response.ok) {
        throw new Error("FFmpeg server error");
      }

      const result = await response.json();
      return NextResponse.json(result);
    }

    // --- LOCAL DEV: Mock processing (simulate FFmpeg) ---
    // In real local dev with FFmpeg installed, uncomment the block below

    const inputPath = join(process.cwd(), "tmp", "uploads", `${uploadId}.mp4`);
    const outputDir = join(process.cwd(), "tmp", "outputs", uploadId);
    await mkdir(outputDir, { recursive: true });

    // Build FFmpeg command reference (for documentation)
    const ffmpegOptions: FFmpegOptions = {
      convertToVertical: options.convertToVertical,
      trimStart: options.trimStart,
      trimEnd: options.trimEnd,
      addCaptions: options.addCaptions,
      captionText: options.captionText,
      extractAudio: options.extractAudio,
      videoDuration: options.videoDuration,
    };

    // Example commands that would run on production:
    const exampleCommands = {
      main: buildChainedCommand(inputPath, join(outputDir, "reel.mp4"), ffmpegOptions),
      audio: options.extractAudio
        ? buildAudioExtractCommand(inputPath, join(outputDir, "audio.mp3"))
        : null,
    };

    console.log("FFmpeg commands (production):", exampleCommands);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate mock output clips
    const clips = [];
    const timestamp = Date.now();

    if (options.convertToVertical) {
      clips.push(
        {
          id: `${timestamp}_reel1`,
          name: "Reel_Clip_1.mp4",
          type: "reel" as const,
          duration: "0:15",
          url: `/api/download/${uploadId}/reel_1.mp4`,
          size: "8.2 MB",
        },
        {
          id: `${timestamp}_short1`,
          name: "Short_Clip_1.mp4",
          type: "short" as const,
          duration: "0:30",
          url: `/api/download/${uploadId}/short_1.mp4`,
          size: "15.4 MB",
        },
        {
          id: `${timestamp}_tiktok1`,
          name: "TikTok_Clip_1.mp4",
          type: "tiktok" as const,
          duration: "0:20",
          url: `/api/download/${uploadId}/tiktok_1.mp4`,
          size: "11.7 MB",
        }
      );

      // Add second set if trim is applied
      if (options.trimEnd - options.trimStart < 90) {
        clips.push(
          {
            id: `${timestamp}_reel2`,
            name: "Reel_Clip_2.mp4",
            type: "reel" as const,
            duration: "0:18",
            url: `/api/download/${uploadId}/reel_2.mp4`,
            size: "9.1 MB",
          },
          {
            id: `${timestamp}_short2`,
            name: "Short_Clip_2.mp4",
            type: "short" as const,
            duration: "0:25",
            url: `/api/download/${uploadId}/short_2.mp4`,
            size: "13.2 MB",
          },
          {
            id: `${timestamp}_tiktok2`,
            name: "TikTok_Clip_2.mp4",
            type: "tiktok" as const,
            duration: "0:22",
            url: `/api/download/${uploadId}/tiktok_2.mp4`,
            size: "12.8 MB",
          }
        );
      }
    }

    if (options.extractAudio) {
      clips.push({
        id: `${timestamp}_audio`,
        name: "Audio_Track.mp3",
        type: "audio" as const,
        duration: "Full",
        url: `/api/download/${uploadId}/audio.mp3`,
        size: "4.3 MB",
      });
    }

    return NextResponse.json({
      success: true,
      uploadId,
      jobId: `job_${timestamp}`,
      clips,
      processingTime: "2.3s",
      commands: exampleCommands, // for developer reference
      message: `Successfully generated ${clips.length} clips`,
    });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Failed to process video. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/process?jobId=xxx
 * Poll job status for async processing
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({
      message: "ClipBoost Processing API",
      version: "1.0.0",
      supportedOperations: [
        "convertToVertical (9:16)",
        "trim (start/end percentage)",
        "addCaptions (text overlay)",
        "extractAudio (MP3)",
      ],
    });
  }

  // In production: check job status from database/queue
  return NextResponse.json({
    jobId,
    status: "completed",
    progress: 100,
    message: "Processing complete",
  });
}
