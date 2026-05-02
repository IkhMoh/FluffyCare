"use client";

import Link from "next/link";

export default function AnimalDetailPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Edit Animal</h1>
      <p>This route is available for deep-link edit support from the table.</p>
      <Link href="/admin/animals" className="rounded-full bg-[#F97316] px-4 py-2 text-white">Back to Animals</Link>
    </main>
  );
}
