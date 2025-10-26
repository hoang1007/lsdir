"use client";

import FileListItem from "./FileListItem";
import { GoogleDriveFile } from "@/lib/google-drive";
import { useState } from "react";

interface FileListProps {
  files: GoogleDriveFile[];
  currentPath: string;
}

export default function FileList({ files, currentPath }: FileListProps) {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const sortedFiles = [...files].sort((a, b) => {
    const aTime = a.modifiedTime ? new Date(a.modifiedTime).getTime() : 0;
    const bTime = b.modifiedTime ? new Date(b.modifiedTime).getTime() : 0;
    return sortOrder === 'desc' ? bTime - aTime : aTime - bTime;
  });

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
              <th className="p-2 cursor-pointer select-none" onClick={handleSortClick}>
                Modified
                <span className="ml-1">
                  {sortOrder === 'desc' ? '▼' : '▲'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedFiles.map((file) => (
              <FileListItem key={file.id} file={file} currentPath={currentPath} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
