// /lib/google-drive.ts

import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { unstable_cache } from "next/cache";
export interface GoogleDriveFile {
  id: string;
  size: string;
  name: string;
  mimeType: string;
  webViewLink: string | null;
  webContentLink: string | null;
  thumbnailLink: string | null;
  modifiedTime?: string;
}

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

/**
 * A cached function to fetch files from a specific Google Drive folder.
 * It uses Next.js's data cache to avoid hitting the API on every request.
 */
export const getFiles = unstable_cache(
  async (folderId: string = "root"): Promise<GoogleDriveFile[]> => {
    console.log(`CACHE MISS: Fetching fresh data for folder: ${folderId}`);
    try {
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields:
          "files(id, size, name, mimeType, webViewLink, webContentLink, thumbnailLink, modifiedTime)",
        orderBy: "folder, name",
      });

      const files = res.data.files || [];

      const validatedFiles = files.filter(
        (file): file is GoogleDriveFile =>
          !!file.id && !!file.name && !!file.mimeType
      );

      return validatedFiles;
    } catch (error) {
      console.error(
        `Failed to fetch files from Google Drive for folder ${folderId}:`,
        error
      );
      return [];
    }
  },
  ["google-drive-files"],
  {
    revalidate: 3600,
    tags: ["drive-collection"],
  }
);

export interface PathSegment {
  id: string;
  name: string;
}

export const getFolderPath = unstable_cache(
  async (folderId: string = "root"): Promise<PathSegment[]> => {
    if (folderId === process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || !folderId) {
      return [];
    }

    console.log(`CACHE MISS: Fetching path for folder: ${folderId}`);
    const path: PathSegment[] = [];
    let currentId: string | undefined = folderId;

    try {
      while (currentId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: import("googleapis").drive_v3.Schema$File | any =
          await drive.files.get({
            fileId: currentId,
            fields: "id, name, parents",
          });

        if (res.data) {
          path.push({ id: res.data.id!, name: res.data.name! });
          currentId = res.data.parents?.[0];
        } else {
          break;
        }
      }
      return path.reverse();
    } catch (error) {
      console.error(`Failed to fetch folder path for ${folderId}:`, error);
      return [];
    }
  },
  ["google-drive-folder-path"],
  {
    revalidate: 3600,
    tags: ["drive-collection"],
  }
);
