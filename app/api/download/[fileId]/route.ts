// app/api/download/[id]/route.ts

import { NextResponse } from 'next/server';
import { getDownloadLink } from "@/lib/google-drive";

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } }
) {
  const resolvedParams = await params;
  const fileId = resolvedParams.fileId;

  try {
    const { url, headers, filename, mimeType } = await getDownloadLink(fileId);

    const fileResp = await fetch(url, { headers });
    if (!fileResp.ok) {
      throw new Error("Failed to fetch file data");
    }

    const fileStream = fileResp.body;

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", mimeType);
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(filename)}"`
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(fileStream as any, { headers: responseHeaders });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
  }
}
