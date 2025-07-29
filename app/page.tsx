export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          <span className="text-green-400">lsdir</span> — dead simple drive index
        </h1>
        <p className="text-neutral-400 text-lg">
          A zero-setup, minimal interface to stream, preview, and access your Google Drive folder from anywhere.
        </p>

        <div className="flex justify-center items-center gap-3 pt-2">
          <a
            href="/explorer"
            className="bg-green-500 text-black font-medium px-5 py-2 rounded-full hover:bg-green-400 transition"
          >
            Open Index
          </a>
          <a
            href="https://github.com/YOUR_USERNAME/lsdir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 underline hover:text-white text-sm"
          >
            GitHub
          </a>
        </div>

        <div className="pt-8">
          <p className="text-xs text-neutral-600">Built for hackers, powered by cats 🐈</p>
        </div>
      </div>
    </main>
  );
}

