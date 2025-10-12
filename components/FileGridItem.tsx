"use client";

import { useState } from "react";
import Link from "next/link";
import FileIcon from "./FileIcon";
import PreviewDialog from "@/components/FilePreviewModal";
import { GoogleDriveFile } from "@/lib/google-drive";

interface Props {
  file: GoogleDriveFile;
  currentPath: string;
}

export default function FileGridItem({ file, currentPath }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const isFolder = file.mimeType === "application/vnd.google-apps.folder";
  const href = `/drive/${currentPath ? currentPath + "/" : ""}${file.id}`;

  const openPreview = () => setPreviewOpen(true);
  const closePreview = () => setPreviewOpen(false);

  const content = (
    <div className="group flex flex-col items-center justify-between p-4 rounded-xl bg-card border border-border hover:bg-primary/10 transition-all duration-200">
      <div className="flex items-center justify-center mb-3 w-full h-36 text-3xl">
        <FileIcon mimeType={file.mimeType} thumbnailLink={file.thumbnailLink} name={file.name} />
      </div>
      <p className="text-sm text-foreground text-center font-medium truncate w-full group-hover:text-primary" title={file.name}>
        {file.name}
      </p>
    </div>
  );

  return (
    <>
      {isFolder ? (
        <Link key={file.id} href={href} className="block">
          {content}
        </Link>
      ) : (
        <button key={file.id} onClick={openPreview} className="block w-full text-left">
          {content}
        </button>
      )}

      {previewOpen && <PreviewDialog file={file} onClose={closePreview} />}
    </>
  );
}
