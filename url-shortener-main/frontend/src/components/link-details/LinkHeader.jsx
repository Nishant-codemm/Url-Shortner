import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function LinkHeader({ slug, userSlug, fullUrl }) {
  const [copied, setCopied] = useState(null);

  const copy = (value, key, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const open = (url, e) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  const CopyBtn = ({ value, keyName }) => (
    <button
      onClick={(e) => copy(value, keyName, e)}
      className="ml-2 p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition"
      title="Copy"
    >
      {copied === keyName ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );

  return (
    <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6 mb-6">
      {/* Short link */}
      <div className="flex items-center gap-2 mb-4">
        <h2
          onClick={(e) => open(slug, e)}
          className="text-4xl font-bold break-all cursor-pointer hover:text-blue-500"
        >
          {slug}
        </h2>
        <CopyBtn value={slug} keyName="short" />
      </div>

      {/* User slug */}
      {userSlug && (
        <div className="flex items-center gap-2 mb-2">
          <h4
            onClick={(e) => open(userSlug, e)}
            className="text-gray-300 text-lg font-bold break-all cursor-pointer hover:text-blue-500"
          >
            {userSlug}
          </h4>
          <CopyBtn value={userSlug} keyName="user" />
        </div>
      )}

      {/* Full URL */}
      <div className="flex items-center gap-2">
        <p
          onClick={(e) => open(fullUrl, e)}
          className="text-gray-400 text-sm break-all cursor-pointer hover:text-blue-700"
        >
          {fullUrl}
        </p>
        <CopyBtn value={fullUrl} keyName="full" />
      </div>
    </div>
  );
}
