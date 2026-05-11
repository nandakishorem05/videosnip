import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB safe limit for Vercel
const ACCEPTED_TYPES = [
  "video/mp4",
  "video/webm", 
  "video/quicktime",
  "video/x-msvideo",
  "video/mpeg",
];

export async function POST(request: NextRequest) {
  try {
    // Check content length before parsing
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large for demo mode. Maximum 4MB on Vercel free plan. Upgrade to Pro for larger uploads." },
        { status: 413 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "File too large. Vercel limits uploads to 4.5MB. Please use a smaller video for testing." },
        { status: 413 }
      );
    }

    const file = formData.get("video") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No video file provided" },
        { status: 400 }
      );
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload MP4, WebM, MOV or AVI." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 4MB in demo mode. Real processing requires FFmpeg server." },
        { status: 413 }
      );
    }

    // Generate upload ID (no actual file storage in demo mode)
    const uploadId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json({
      success: true,
      uploadId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      message: "Video uploaded successfully (demo mode)",
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try a smaller video file." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "ClipBoost Upload API",
    maxFileSize: "4MB (demo) / 500MB (with FFmpeg server)",
    acceptedTypes: ACCEPTED_TYPES,
    version: "1.0.0",
  });
}
