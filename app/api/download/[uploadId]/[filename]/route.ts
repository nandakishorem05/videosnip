import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ uploadId: string; filename: string }> }
) {
  const { uploadId, filename } = await context.params;

  // Sanitize inputs
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

  // Demo mode response
  return NextResponse.json(
    {
      error: "File not found",
      note: "Demo mode — connect FFmpeg server for real processing.",
    },
    { status: 404 }
  );
}