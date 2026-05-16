import LinkCard from "./LinkCard";
import { Link as LinkIcon } from "lucide-react";

export default function LinksList({
  links,
  copiedId,
  onCopy,
  onDelete,
  onQr,
}) {
  // Empty state
  if (!links || links.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-2xl p-12 bg-black-900/20">
        <div className="p-4 rounded-full bg-black-800 mb-4">
          <LinkIcon size={32} className="text-gray-500" />
        </div>

        <h4 className="font-semibold text-gray-200 mb-1">
          No links created yet
        </h4>
        <p className="text-sm text-gray-500 max-w-sm">
          Paste a long URL above and click <span className="text-blue-400">Shorten Now</span> to create your first link.
        </p>
      </div>
    );
  }

  // Normal list
  return (
    <div className="space-y-3 mt-16">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          copiedId={copiedId}
          onCopy={onCopy}
          onDelete={onDelete}
          onQr={onQr}
        />
      ))}
    </div>
  );
}
