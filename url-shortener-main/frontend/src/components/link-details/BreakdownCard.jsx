export default function BreakdownCard({ title, icon: Icon, data }) {
  return (
    <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6">
      <h3 className="font-bold mb-3">{title}</h3>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="flex justify-between text-sm text-gray-400">
          <span className="flex items-center gap-1">
            {Icon && <Icon size={14} />} {k}
          </span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  );
}
