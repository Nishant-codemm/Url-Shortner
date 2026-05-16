import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { fetchLinkAnalytics } from "../api/link";

export const useLinkAnalytics = (id) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchLinkAnalytics(id);

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setData(res.data);
      } catch {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const analytics = useMemo(() => data?.analytics ?? [], [data]);

  const clicksOverTime = useMemo(() => {
    const map = {};
    analytics.forEach((c) => {
      const day = new Date(c.createdAt).toLocaleDateString();
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map).map(([date, clicks]) => ({ date, clicks }));
  }, [analytics]);

  const breakdown = (key, fallback = "Unknown") =>
    analytics.reduce((acc, c) => {
      const val = c[key] || fallback;
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

  return {
    loading,
    data,
    clicksOverTime,
    deviceStats: breakdown("deviceType"),
    countryStats: breakdown("country"),
    referrerStats: breakdown("referrer", "Direct"),
  };
};
