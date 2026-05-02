import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ uploadId: string; filename: string }> }
) {
  try {
    const params = await context.params;
    const safeUploadId = params.uploadId.replace(/[^a-zA-Z0-9_-]/g, "");
    const safeFilename = params.filename.replace(/[^a-zA-Z0-9._-]/g, "");

    if (!safeUploadId || !safeFilename) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "File not found",
        note: "Demo mode — connect FFmpeg server for real processing.",
      },
      { status: 404 }
    );
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}