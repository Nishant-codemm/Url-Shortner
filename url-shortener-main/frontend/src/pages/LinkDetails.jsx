import { useParams, useNavigate } from "react-router";
import { Smartphone, Globe } from "lucide-react";
import BackButton from "../components/link-details/BackButton";
import ExpiredBanner from "../components/link-details/ExpiredBanner";
import LinkHeader from "../components/link-details/LinkHeader";
import LinkStats from "../components/link-details/LinkStats";
import { useLinkAnalytics } from "../hooks/useLinkAnalytics";
import BreakdownCard from "../components/link-details/BreakdownCard";
import ClicksChart from "../components/link-details/ClickCharts";

export default function LinkDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const {
    loading,
    data,
    clicksOverTime,
    deviceStats,
    countryStats,
    referrerStats,
  } = useLinkAnalytics(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-black-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  const { url, totalClicks, qrCode } = data;

  return (
    <div className="bg-black-950 text-gray-100 min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={() => nav(-1)} />
        {url.isExpired && <ExpiredBanner />}
        <LinkHeader slug={url.slug} userSlug={url.userSlug} fullUrl={url.fullUrl} />
        <LinkStats
          totalClicks={totalClicks}
          expired={url.isExpired}
          expiry={url.expiredDate}
          qrCode={qrCode}
        />
        <ClicksChart data={clicksOverTime} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BreakdownCard title="Devices" icon={Smartphone} data={deviceStats} />
          <BreakdownCard title="Countries" icon={Globe} data={countryStats} />
          <BreakdownCard title="Referrers" data={referrerStats} />
        </div>
      </div>
    </div>
  );
}
