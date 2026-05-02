export function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-[#FFF7ED] p-6 shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-mono text-3xl font-bold">{value}</p>
      <p className="text-xs text-green-700">+8% vs last month</p>
    </div>
  );
}
