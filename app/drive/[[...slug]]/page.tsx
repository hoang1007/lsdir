import { getFiles, getFolderPath } from "@/lib/google-drive";
import Breadcrumbs from "@/components/Breadcrumbs";
import DriveViewer from "@/components/DriveViewer";
import Image from "next/image";

interface DrivePageProps {
  params: Promise<{ slug: string[] }>;
}

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || "root";

export default async function DrivePage({ params }: DrivePageProps) {
  const safeFolderId = (await params).slug || [];
  const folderId = safeFolderId?.length
    ? safeFolderId[safeFolderId.length - 1]
    : ROOT_FOLDER_ID;

  const [files, path] = await Promise.all([
    getFiles(folderId),
    getFolderPath(folderId),
  ]);

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-background text-foreground">
      <div className="flex gap-4 items-start">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-2xl shadow-md bg-yellow-500/90"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary">lsdir</h1>
          <p className="text-muted-foreground">Cat is exploring your Drive</p>
        </div>
      </div>

      <Breadcrumbs path={path} />

      <DriveViewer files={files} currentPath={safeFolderId.join("/") || ""} />
    </div>
  );
}
