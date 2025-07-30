"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoogleDriveFile } from "@/lib/google-drive";
import MediaPreview from "./MediaPreview";

import { formatBytes } from "@/lib/formatBytes";

interface PreviewDialogProps {
  file: GoogleDriveFile | null;
  onClose: () => void;
}

export default function PreviewDialog({ file, onClose }: PreviewDialogProps) {
  if (!file) return null;

  const renderPreviewContent = () => {
    if (
      file.mimeType.startsWith("image/") ||
      file.mimeType.startsWith("video/")
    ) {
      return <MediaPreview file={file} />;
    }

    if (file.mimeType === "application/pdf") {
      const embedUrl = `https://drive.google.com/file/d/${file.id}/preview`;
      return (
        <iframe
          src={embedUrl}
          className="w-full h-[75vh] border-0"
          title={file.name}
        ></iframe>
      );
    }

    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold">No preview available</p>
        <p className="text-sm text-muted-foreground mt-1">
          You can download the file to view it.
        </p>
      </div>
    );
  };

  return (
    <Dialog open={!!file} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] h-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="truncate text-base sm:text-lg font-semibold">
            {file.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-grow flex items-center justify-center my-4 overflow-hidden">
          {renderPreviewContent()}
        </div>

        <DialogFooter className="mt-auto flex flex-wrap items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">
            Size: {formatBytes(parseInt(file.size))}
          </span>

          <div className="flex gap-2">
            {file.webContentLink && (
              <Button variant="outline" asChild>
                <a
                  href={file.webContentLink}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </Button>
            )}
            <DialogClose asChild>
              <Button onClick={onClose}>Close</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
