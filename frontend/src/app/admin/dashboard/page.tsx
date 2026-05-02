"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/admin/StatsCard";
import { api } from "@/lib/api";

type Stats = { totalAnimals: number; available: number; pending: number; adopted: number; newThisMonth: number };

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalAnimals: 12, available: 7, pending: 3, adopted: 2, newThisMonth: 5 });

  useEffect(() => {
    api.get("/api/admin/stats").then((res) => setStats(res.data)).catch(() => undefined);
  }, []);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="flex gap-3">
        <a href="/admin/animals" className="rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-white">+ Add New Animal</a>
        <a href="/admin/animals" className="rounded-full border bg-white px-4 py-2 text-sm font-semibold">Export CSV</a>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Animals" value={stats.totalAnimals} />
        <StatsCard title="Available" value={stats.available} />
        <StatsCard title="Pending Adoption" value={stats.pending} />
        <StatsCard title="Adopted This Month" value={stats.newThisMonth} />
      </div>
    </main>
  );
}
