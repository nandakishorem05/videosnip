import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { existsSync, createReadStream, statSync } from "fs";

/**
 * GET /api/download/[uploadId]/[filename]
 *
 * Serves processed video files.
 * In production, redirect to cloud storage (S3/Vercel Blob) URLs instead.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { uploadId: string; filename: string } }
) {
  const { uploadId, filename } = params;

  // Sanitize inputs to prevent directory traversal
  const safeUploadId = uploadId.replace(/[^a-zA-Z0-9_-]/g, "");
  const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "");

  if (!safeUploadId || !safeFilename) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  // In production: redirect to signed S3/Vercel Blob URL
  if (process.env.FFMPEG_SERVER_URL) {
    const downloadUrl = `${process.env.FFMPEG_SERVER_URL}/download/${safeUploadId}/${safeFilename}`;
    return NextResponse.redirect(downloadUrl);
  }

  // Local dev: serve from tmp directory
  const filePath = join(
    process.cwd(),
    "tmp",
    "outputs",
    safeUploadId,
    safeFilename
  );

  if (!existsSync(filePath)) {
    // Return a sample video response for demo purposes
    return NextResponse.json(
      {
        error: "File not found",
        note: "In demo mode, actual files are not generated. Connect FFmpeg server for real processing.",
      },
      { status: 404 }
    );
  }

  const stat = statSync(filePath);
  const isVideo = safeFilename.endsWith(".mp4") || safeFilename.endsWith(".webm");
  const isAudio = safeFilename.endsWith(".mp3");

  const contentType = isVideo
    ? "video/mp4"
    : isAudio
    ? "audio/mpeg"
    : "application/octet-stream";

  return new NextResponse(createReadStream(filePath) as unknown as ReadableStream, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": stat.size.toString(),
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
