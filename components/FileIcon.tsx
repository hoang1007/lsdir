// components/FileIcon.tsx

import Image from "next/image"; // Use Next.js Image for optimization

interface FileIconProps {
  mimeType: string;
  thumbnailLink?: string | null; // Thumbnail link is optional
  name: string; // Pass name for alt text (good for accessibility)
  className?: string;
}

export default function FileIcon({ mimeType, thumbnailLink, name, className = "" }: FileIconProps) {
  // Helper for emoji icons
  const getEmojiIcon = () => {
    if (mimeType.startsWith("image/")) return "🖼️";
    if (mimeType.startsWith("video/")) return "🎬";
    if (mimeType === "application/pdf") return "📄";
    if (mimeType === "application/vnd.google-apps.folder") return "📁";
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
      return "📊";
    if (mimeType.includes("document") || mimeType.includes("word")) return "📝";
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
      return "🖥️";
    if (mimeType.startsWith("audio/")) return "🎵";
    if (
      mimeType === "application/zip" ||
      mimeType === "application/x-rar-compressed"
    )
      return "📦";
    return "📎";
  };

  return (
    <div className={`flex items-center justify-center ${className}`.trim()}>
      <div className={`w-full h-full flex items-center justify-center rounded-lg overflow-hidden`}>
        {thumbnailLink ? (
          <Image
            src={thumbnailLink}
            alt={`Thumbnail for ${name}`}
            width={128}
            height={128}
            className="object-cover w-full h-full bg-secondary"
          />
        ) : (
          <div className="text-current">{getEmojiIcon()}</div>
        )}
      </div>
    </div>
  );
}
