import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ClicksChart({ data }) {
  return (
    <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6 mb-8">
      <h3 className="font-bold mb-4">Clicks Over Time</h3>
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No clicks yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="clicks" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
