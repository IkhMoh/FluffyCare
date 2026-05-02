"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { auth } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (!auth.getToken()) router.push("/admin/login");
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex-1 bg-[#FEF3E2] p-6">{children}</div>
    </div>
  );
}
