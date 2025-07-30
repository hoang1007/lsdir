// components/Breadcrumbs.tsx
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { PathSegment } from "@/lib/google-drive";

interface BreadcrumbsProps {
  path: PathSegment[];
}

export default function Breadcrumbs({ path }: BreadcrumbsProps) {
  return (
    <nav
      className="mb-6 text-sm text-muted-foreground mt-2"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap gap-1 md:gap-2">
        <li className="flex items-center">
          <Link
            href="/drive"
            className="hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
        </li>

        {path.map((segment, index) => {
          const href = `/drive/${path
            .slice(0, index + 1)
            .map((p) => p.id)
            .join("/")}`;

          return (
            <li key={segment.id} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href={href}
                className="hover:text-primary transition-colors font-medium"
              >
                {segment.name}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
