import { Download } from "lucide-react";

export default function LinkStats({ totalClicks, expired, expiry, qrCode }) {
  const downloadQr = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Total Clicks */}
      <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6">
        <div className="text-gray-400 text-sm">Total Clicks</div>
        <div className="text-3xl font-bold">{totalClicks}</div>
      </div>

      {/* Status */}
      <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6">
        <div className="text-gray-400 text-sm mb-2">Status</div>
        <div
          className={`text-lg font-semibold ${expired ? "text-red-400" : "text-emerald-400"
            }`}
        >
          {expired ? "Expired" : "Active"}
        </div>
        <div className="text-xs text-gray-500">
          Expires on {new Date(expiry).toLocaleDateString()}
        </div>
      </div>

      {/* QR Code + Download */}
      <div className="relative bg-black-900/40 border border-white/10 rounded-2xl p-6 flex items-center justify-center">
        {/* Download button – top right */}
        <button
          onClick={downloadQr}
          className="
      absolute top-3 right-3
      p-2 rounded-full
      bg-gray-600 hover:bg-blue-500
      text-white
      transition
    "
          title="Download QR"
        >
          <Download size={16} />
        </button>

        {/* QR Image */}
        <img
          src={qrCode}
          alt="QR"
          className="w-32 h-32 bg-white p-2 rounded-xl"
        />
      </div>

    </div>
  );
}
