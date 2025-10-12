"use client";

// ...existing code...
import FileGridItem from "./FileGridItem";
import { GoogleDriveFile } from "@/lib/google-drive";

interface FileGridProps {
  files: GoogleDriveFile[];
  currentPath: string;
}

export default function FileGrid({ files, currentPath }: FileGridProps) {
  if (files.length === 0) {
    return <p className="text-muted-foreground">This folder is empty.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {files.map((file) => (
          <FileGridItem key={file.id} file={file} currentPath={currentPath} />
        ))}
      </div>
    </>
  );
}
