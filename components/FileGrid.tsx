"use client";

import { useState } from "react";
import Link from "next/link";
import FileIcon from "./FileIcon";
import PreviewDialog from "@/components/FilePreviewModal";
import { GoogleDriveFile } from "@/lib/google-drive";

interface FileGridProps {
  files: GoogleDriveFile[];
  currentPath: string;
}

export default function FileGrid({ files, currentPath }: FileGridProps) {
  const [selectedFile, setSelectedFile] = useState<GoogleDriveFile | null>(
    null
  );

  if (files.length === 0) {
    return <p className="text-muted-foreground">This folder is empty.</p>;
  }

  const handleFileClick = (file: GoogleDriveFile) => {
    setSelectedFile(file);
  };

  const handleCloseDialog = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {files.map((file) => {
          const isFolder =
            file.mimeType === "application/vnd.google-apps.folder";
          const href = `/drive/${currentPath ? currentPath + "/" : ""}${
            file.id
          }`;

          const commonContent = (
            <>
              <div className="flex items-center justify-center mb-2">
                <FileIcon
                  mimeType={file.mimeType}
                  thumbnailLink={file.thumbnailLink}
                  name={file.name}
                />
              </div>
              <p
                className="text-xs text-foreground text-center font-medium truncate w-full group-hover:text-primary"
                title={file.name}
              >
                {file.name}
              </p>
            </>
          );

          if (isFolder) {
            return (
              <Link
                key={file.id}
                href={href}
                className="group flex flex-col items-center justify-between p-4 rounded-xl bg-card border border-border hover:bg-primary/10 transition-all duration-200"
              >
                {commonContent}
              </Link>
            );
          }

          return (
            <button
              key={file.id}
              onClick={() => handleFileClick(file)}
              className="group flex flex-col items-center justify-between p-4 rounded-xl bg-card border border-border hover:bg-primary/10 transition-all duration-200 focus:outline-none"
            >
              {commonContent}
            </button>
          );
        })}
      </div>

      {selectedFile && (
        <PreviewDialog file={selectedFile} onClose={handleCloseDialog} />
      )}
    </>
  );
}
