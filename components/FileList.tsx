"use client";

import FileListItem from "./FileListItem";
import { GoogleDriveFile } from "@/lib/google-drive";

interface FileListProps {
  files: GoogleDriveFile[];
  currentPath: string;
}

export default function FileList({ files, currentPath }: FileListProps) {
  if (files.length === 0) {
    return <p className="text-muted-foreground">This folder is empty.</p>;
  }

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b border-border">
              <th className="p-2">Name</th>
              <th className="p-2">Type / Size</th>
              <th className="p-2">Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <FileListItem key={file.id} file={file} currentPath={currentPath} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
