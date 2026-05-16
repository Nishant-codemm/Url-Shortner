export default function HeroSection() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-medium -mt-[200px] mb-6">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        New: Smart QR Codes
      </div>

      <h1 className="text-5xl font-bold mb-4">
        Shorten Your URL{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Expand Your Reach
        </span>
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto">
        Create powerful short links with analytics, QR codes, and custom slugs.
      </p>
    </div>
  );
}
