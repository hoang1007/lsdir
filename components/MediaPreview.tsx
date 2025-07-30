// components/MediaPreview.tsx
"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GoogleDriveFile } from "@/lib/google-drive";
import Image from "next/image";

interface MediaPreviewProps {
  file: GoogleDriveFile;
}

export default function MediaPreview({ file }: MediaPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [file.id]);

  const proxyUrl = `/api/drive/proxy/${file.id}`;
  const isVideo = file.mimeType.startsWith("video/");

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
      )}

      {hasError && (
        <div className="text-center text-destructive">
          <p className="font-semibold">Preview failed to load.</p>
          <p className="text-sm">Please try downloading the file instead.</p>
        </div>
      )}

      {isVideo ? (
        <video
          key={file.id}
          src={proxyUrl}
          controls
          autoPlay
          onCanPlay={handleLoad}
          onError={handleError}
          className={`max-h-[70vh] w-full rounded-lg transition-opacity duration-300 ${
            isLoading || hasError ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <Image
          key={file.id}
          src={proxyUrl}
          alt={file.name}
          onLoad={handleLoad}
          onError={handleError}
          className={`max-h-[70vh] w-auto object-contain mx-auto transition-opacity duration-300 ${
            isLoading || hasError ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
}
