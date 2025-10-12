"use client";

// no local hooks needed here; use the ViewModeProvider context instead
import FileGrid from "./FileGrid";
import FileList from "./FileList";
import { GoogleDriveFile } from "@/lib/google-drive";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Grid as GridIcon, List as ListIcon } from "lucide-react";

interface DriveViewerProps {
  files: GoogleDriveFile[];
  currentPath: string;
}

import { useViewMode } from "./ViewModeProvider";

export default function DriveViewer({ files, currentPath }: DriveViewerProps) {
  const { view, setView } = useViewMode();

  return (
    <div className="w-full">
      <div className="flex items-center justify-end mb-4 gap-2">
        {/* Dropdown selector for view mode */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1 rounded-md border border-border bg-card">
                {view === "grid" ? <GridIcon /> : <ListIcon />}
                <span className="text-sm">{view === "grid" ? "Grid" : "List"}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setView("grid")}> 
                <GridIcon className="size-4" />
                Grid
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setView("list")}> 
                <ListIcon className="size-4" />
                List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {view === "grid" ? (
        <FileGrid files={files} currentPath={currentPath} />
      ) : (
        <FileList files={files} currentPath={currentPath} />
      )}
    </div>
  );
}
