"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FileIcon from "./FileIcon";
import PreviewDialog from "@/components/FilePreviewModal";
import { GoogleDriveFile } from "@/lib/google-drive";
import { formatBytes } from "@/lib/formatBytes";

interface Props {
  file: GoogleDriveFile;
  currentPath: string;
}

export default function FileListItem({ file, currentPath }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();
  const isFolder = file.mimeType === "application/vnd.google-apps.folder";
  const href = `/drive/${currentPath ? currentPath + "/" : ""}${file.id}`;
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  const onClick = () => {
    if (isFolder) {
      router.push(href);
      return;
    }
    setPreviewOpen(true);
  };

  const closePreview = () => setPreviewOpen(false);

  useEffect(() => {
    if (file.modifiedTime) {
      try {
        setFormattedDate(new Date(file.modifiedTime).toLocaleString());
      } catch {
        setFormattedDate(file.modifiedTime);
      }
    }
  }, [file.modifiedTime]);

  return (
    <>
      <tr className="align-middle border-b border-border hover:bg-primary/5 cursor-pointer" onClick={onClick}>
        <td className="py-2 px-3 align-middle">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex-shrink-0 text-2xl flex items-center justify-center">
            <FileIcon mimeType={file.mimeType} thumbnailLink={file.thumbnailLink} name={file.name} className="w-10 h-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm break-words leading-tight">{file.name}</span>
            </div>
          </div>
        </td>
        <td className="py-2 px-3 text-sm w-28 text-muted-foreground">{isFolder ? 'Folder' : formatBytes(Number(file.size))}</td>
        <td className="py-2 px-3 text-sm w-44 text-muted-foreground">{formattedDate ?? (file.modifiedTime ? '...' : '-')}</td>
      </tr>

      {previewOpen && <PreviewDialog file={file} onClose={closePreview} />}
    </>
  );
}
