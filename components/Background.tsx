"use client";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

// candidate filenames (order matters: prefer modern formats first)
const CANDIDATES = [
  "/bg.avif",
  "/bg.webp",
  "/bg.jpeg",
  "/bg.jpg",
  "/bg.png",
];

export default function Background({ children }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      for (const candidate of CANDIDATES) {
        // try loading the image; resolve true on load, false on error
        const found = await new Promise<boolean>((res) => {
          const img = new Image();
          img.onload = () => res(true);
          img.onerror = () => res(false);
          img.src = candidate;
        });

        if (found) {
          if (mounted) setSrc(candidate);
          break;
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="app-bg">
      {/* separately-positioned image layer so we can fade it in without affecting layout */}
      <div
        className={`app-bg__image ${src ? "loaded" : ""}`}
        style={src ? { backgroundImage: `url(${src})` } : undefined}
        aria-hidden
      />

      <div className="app-bg__overlay" />

      <main className="app-content">{children}</main>
    </div>
  );
}
