import { Copy, Trash2, BarChart3, Check, QrCode } from "lucide-react";
import { useNavigate } from "react-router";

export default function LinkCard({
  link,
  copiedId,
  onCopy,
  onDelete,
  onQr,
}) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/links/${link.id}`);
  };

  const goToShortLink = (e) => {
    e.stopPropagation(); 
    window.open(link.short, "_blank"); 
  };

  return (
    <div
      onClick={goToDetails}
      className="
        group cursor-pointer
        bg-black-900/40
        border border-white/5
        hover:border-blue-600/30
        hover:bg-black-800/40
        p-5 rounded-2xl
        transition-all
      "
    >
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left: Link info */}
        <div className="flex-1 min-w-0">
          <p
            className="
              font-semibold text-base
              text-gray-100
              truncate
              group-hover:text-blue-400
              transition-colors
            "
            title={link.short}
            onClick={goToShortLink}
          >
            {link.short}
          </p>
          <p
            className="text-sm text-gray-500 truncate"
            title={link.original}
          >
            {link.original}
          </p>
        </div>

        {/* Right: Stats + actions */}
        <div className="flex items-center gap-6">
          {/* Clicks */}
          <div className="text-right">
            <p className="font-semibold flex items-center justify-end gap-1 text-gray-200">
              <BarChart3 size={16} />
              {link.views}
            </p>
            <p className="text-xs text-gray-500">{link.date}</p>
          </div>

          {/* Actions */}
          <div
            className="flex gap-2 border-l border-white/5 pl-4"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Copy */}
            <button
              onClick={() => onCopy(link.short, link.id)}
              className="
                p-2.5 rounded-xl
                text-gray-400
                hover:bg-blue-600 hover:text-white
                active:scale-95
                transition-all
              "
              title="Copy link"
            >
              {copiedId === link.id ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}
            </button>

            {/* QR */}
            <button
              onClick={() => onQr(link)}
              className="
                p-2.5 rounded-xl
                text-gray-400
                hover:bg-white/10 hover:text-white
                active:scale-95
                transition-all
              "
              title="Show QR code"
            >
              <QrCode size={18} />
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(link.id)}
              className="
                p-2.5 rounded-xl
                text-gray-400
                hover:bg-red-500/10 hover:text-red-400
                active:scale-95
                transition-all
              "
              title="Delete link"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
