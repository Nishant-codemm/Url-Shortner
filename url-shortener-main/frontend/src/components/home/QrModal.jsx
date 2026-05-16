import { X, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function QrModal({ link, onClose }) {
  const navigate = useNavigate();
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!link) return;

    const fetchQr = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}/link/qr?linkId=${link.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.data.success) {
          toast.error(res.data.message);
          return;
        }

        setQr(res.data.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Failed to load QR code");
      } finally {
        setLoading(false);
      }
    };

    fetchQr();
  }, [link]);

  if (!link) return null;

  const goToDetails = () => {
    onClose();
    navigate(`/links/${link.id}`);
  };

  const downloadQr = () => {
    const a = document.createElement("a");
    a.href = qr;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="relative bg-black-900 p-6 rounded-2xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">QR Code</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl mb-6 flex justify-center">
          {loading ? (
            <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent" />
          ) : (
            <img src={qr} alt="QR" />
          )}
        </div>

        <div className="flex gap-3">
          <button
            disabled={!qr}
            onClick={downloadQr}
            className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-xl text-sm font-medium"
          >
            Download
          </button>

          <button
            onClick={goToDetails}
            className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >
            <BarChart3 size={16} />
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
