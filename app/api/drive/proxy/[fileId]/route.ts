// app/api/drive/proxy/[fileId]/route.ts

import { NextResponse } from "next/server";
import { drive } from "@/lib/google-drive";

interface RouteContext {
  params: {
    fileId: string;
  };
}

export async function GET(request: Request, context: RouteContext) {
  const { fileId } = context.params;

  if (!fileId) {
    return new NextResponse("File ID is required", { status: 400 });
  }

  try {
    const metadataResponse = await drive.files.get({
      fileId: fileId,
      fields: "mimeType, size, name",
    });

    const mimeType =
      metadataResponse.data.mimeType || "application/octet-stream";
    const size = metadataResponse.data.size || "0";
    const name = metadataResponse.data.name || "file";

    const fileResponse = await drive.files.get(
      {
        fileId: fileId,
        alt: "media",
      },
      {
        responseType: "stream",
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Response(fileResponse.data as any, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Length": size,
        "Content-Disposition": `inline; filename="${name}"`, // Suggests a filename
      },
    });
  } catch (error) {
    console.error(`[DRIVE PROXY] Failed to proxy file ${fileId}:`, error);
    return new NextResponse("Failed to retrieve file from Google Drive.", {
      status: 500,
    });
  }
}
