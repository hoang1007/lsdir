"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [titleWidth, setTitleWidth] = useState(0);
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (titleRef.current) {
        setTitleWidth(titleRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="min-h-screen text-foreground flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-xl">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            <span className="relative inline-block" ref={titleRef}>
              <span className="text-primary">lsdir</span> — dead simple drive
              {titleWidth > 0 && (
                <motion.img
                  src="/cat-walk.gif"
                  alt="Walking cat"
                  className="absolute top-[-2rem] left-0 h-8 md:h-10 pointer-events-none z-10"
                  animate={{
                    x: [0, titleWidth, titleWidth, 0],
                    scaleX: [1, 1, -1, -1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5, 0.5, 1],
                  }}
                />
              )}
            </span>{" "}
            index
          </h1>
        </div>

        <p className="text-muted-foreground text-lg">
          A zero-setup, minimal interface to stream, preview, and access your
          Google Drive folder from anywhere.
        </p>

        <div className="flex justify-center items-center gap-3 pt-2">
          <Link
            href="/drive"
            className="bg-primary text-primary-foreground font-medium px-5 py-2 rounded-full hover:opacity-90 transition"
          >
            Open Index
          </Link>

          <Link
            href="https://github.com/GivenBY/lsdir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline hover:text-foreground text-sm"
          >
            GitHub
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-xs text-muted-foreground">
            Built for hackers, powered by cats 🐈
          </p>
        </div>
      </div>
    </main>
  );
}
