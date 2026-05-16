import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  QrCode,
  Link as LinkIcon,
  BarChart3,
  Trash2,
  Check,
  X,
  Download,
  TrendingUp,
  Globe,
  Search,
} from "lucide-react";
import { getLinks, deleteLinks } from "../api/link";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  // QR Modal
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeQrLink, setActiveQrLink] = useState(null);

  const fetchAllLinks = async () => {
    try {
      setLoading(true);
      const res = await getLinks();

      if (!res || !res.success) {
        toast.error(res?.message || "Failed to load dashboard");
        return;
      }

      const normalized = res.data.urls.map((item) => ({
        id: item.id,
        original: item.fullUrl,
        short: item.shortUrl,
        custom: item.userUrl ? item.userUrl.split("/u/")[1] : "-",
        views: item.clicks,
        date: new Date(item.createdAt).toLocaleDateString(),
        qrCode: null,
      }));

      setLinks(normalized);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLinks();
  }, []);

  // 🔍 Search logic (memoized)
  const filteredLinks = useMemo(() => {
    if (!search.trim()) return links;

    const q = search.toLowerCase();
    return links.filter(
      (l) =>
        l.original.toLowerCase().includes(q) ||
        l.short.toLowerCase().includes(q) ||
        l.custom.toLowerCase().includes(q)
    );
  }, [search, links]);

  const totalClicks = useMemo(
    () => links.reduce((sum, l) => sum + l.views, 0),
    [links]
  );

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDelete = async (id) => {
    const res = await deleteLinks({ id });
    if (!res || !res.success) return;
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const openQrModal = (link) => {
    setActiveQrLink(link);
    setQrModalOpen(true);
  };

  const downloadQrCode = (base64) => {
    const a = document.createElement("a");
    a.href = base64;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black-950">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-black-950 text-gray-100 pb-10">
      <main className="relative z-10 max-w-6xl mx-auto pt-10 px-6">

        {/* 🔍 Search Bar */}
        <div className="mb-10 relative max-w-full">
          <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search links…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-black-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* 📊 Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="bg-black-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-xl">
            <div className="text-gray-400 text-sm">Total Clicks</div>
            <div className="text-3xl font-bold mt-1">{totalClicks}</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> Live
            </div>
          </div>

          <div className="bg-black-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-xl">
            <div className="text-gray-400 text-sm">Active Links</div>
            <div className="text-3xl font-bold mt-1">{links.length}</div>
            <div className="text-indigo-400 text-xs mt-1 flex items-center gap-1">
              <Globe size={12} /> Global
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-600/10 p-6  rounded-2xl text-center">
            <div className="text-blue-300 pt-4 font-semibold">Dashboard</div>
            <div className="text-blue-400/70 text-xs">
              Manage all your links
            </div>
          </div>
        </div>

        {/* 🔗 Links List */}
        <div>
          <h3 className="text-xl font-bold mb-4">Your Links</h3>

          <div className="space-y-3">
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                className="bg-black-900/40 border border-white/5 hover:border-blue-600/30 hover:bg-black-800/40 p-5 rounded-2xl transition cursor-pointer"
                onClick={() => nav(`/links/${link.id}`)}
              >

                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <a className="text-lg font-bold hover:text-blue-400 transition block">
                      {link.short}
                    </a>
                    <p className="text-gray-500 text-sm truncate">
                      {link.original}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold flex items-center justify-end gap-1">
                        <BarChart3 size={16} /> {link.views}
                      </p>
                      <p className="text-xs text-gray-500">{link.date}</p>
                    </div>

                    <div className="flex gap-2 border-l border-white/5 pl-4">
                      <button
                        onClick={() => copyToClipboard(link.short, link.id)}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-blue-600 hover:text-white transition"
                      >
                        {copiedId === link.id ? (
                          <Check size={18} />
                        ) : (
                          <Copy size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => openQrModal(link)}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition"
                      >
                        <QrCode size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLinks.length === 0 && (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl mt-6">
              <LinkIcon size={40} className="text-gray-600 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400">No matching links found</p>
            </div>
          )}
        </div>
      </main>

      {/* 📎 QR Modal */}
      {qrModalOpen && activeQrLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setQrModalOpen(false)}
          />
          <div className="relative bg-black-900 p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">QR Code</h3>
              <button onClick={() => setQrModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-xl mb-4">
              <img src={activeQrLink.qrCode} alt="QR" />
            </div>
            <button
              onClick={() => downloadQrCode(activeQrLink.qrCode)}
              className="w-full bg-blue-600 py-2 rounded-xl"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
