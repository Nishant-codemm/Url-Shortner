import { AlertTriangle } from "lucide-react";

export default function ExpiredBanner() {
  return (
    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">
      <AlertTriangle size={18} />
      This link has expired.
    </div>
  );
}
