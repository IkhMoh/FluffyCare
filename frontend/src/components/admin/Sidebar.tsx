"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const items = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/animals", label: "Animals" },
  ];

  return (
    <aside className="min-h-screen w-64 bg-[#1C0A00] p-4 text-white">
      <p className="mb-6 text-2xl font-bold text-[#FB923C]">FluffyCare</p>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-xl px-4 py-3 ${pathname === item.href ? "bg-[#F97316]" : "hover:bg-white/10"}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        className="mt-8 rounded-xl border border-white/30 px-4 py-2 text-sm"
        onClick={() => {
          auth.clearToken();
          router.push("/admin/login");
        }}
      >
        Logout
      </button>
    </aside>
  );
}
