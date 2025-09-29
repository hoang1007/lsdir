// app/api/download/[id]/route.ts

import { google } from 'googleapis';
import { JWT } from "google-auth-library";
import { NextResponse } from 'next/server';

function getGoogleAuth() {
  const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!base64Key) {
    throw new Error(
      "The GOOGLE_SERVICE_ACCOUNT_BASE64 environment variable is not set."
    );
  }

  const keyJson = Buffer.from(base64Key, "base64").toString("utf8");
  const credentials = JSON.parse(keyJson);

  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return auth;
}

export const drive = google.drive({ version: "v3", auth: getGoogleAuth() });

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const resolvedParams = await params;
  const fileId = resolvedParams.id;

  try {
    const metadata = await drive.files.get({
      fileId,
      fields: 'name,mimeType',
    });

    const file = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    const headers = new Headers();
    headers.set('Content-Type', metadata.data.mimeType || 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(metadata.data.name || 'file')}"`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(file.data as any, { headers });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
