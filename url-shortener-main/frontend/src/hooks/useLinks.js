import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createLink, deleteLinks, getLinks } from "../api/link";

export function useLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  /* -------------------- fetch latest 5 links -------------------- */
  const fetchAll = async () => {
    try {
      setLoading(true);

      const res = await getLinks();

      if (!res || !res.success) {
        toast.error(res?.message || "Failed to fetch links");
        return;
      }

      // take latest 5 only
      const normalized = res.data.urls
        .slice(0, 5)
        .map((item) => ({
          id: item.id,
          original: item.fullUrl,
          short: item.shortUrl,
          custom: item.userUrl ? item.userUrl.split("/u/")[1] : "-",
          views: item.clicks,
          date: new Date(item.createdAt).toLocaleDateString(),
          qrCode: null,
        }));

      setLinks(normalized);
    } catch {
      toast.error("Failed to load links");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- initial load -------------------- */
  useEffect(() => {
    fetchAll();
  }, []);

  /* -------------------- create -------------------- */
  const create = async (values) => {
    setCreating(true);
    const res = await createLink(values);
    setCreating(false);

    if (!res || !res.success) return;

    const { created, qrCode } = res.data;

    const newLink = {
      id: created._id,
      original: created.fullUrl,
      short:
        created.shortUrl ||
        `${import.meta.env.VITE_BASE_URL}/${created.slug}`,
      custom: created.userSlug || "-",
      views: created.clicks,
      date: "Just now",
      qrCode,
    };

    // prepend + keep only 5
    setLinks((prev) => [newLink, ...prev].slice(0, 5));
  };

  /* -------------------- delete -------------------- */
  const remove = async (id) => {
    const res = await deleteLinks({ id });
    if (!res || !res.success) return;

    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return {
    links,
    loading,
    creating,
    create,
    remove,
  };
}
