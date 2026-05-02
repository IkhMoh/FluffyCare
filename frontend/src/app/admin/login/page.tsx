"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ email: string; password: string }>();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1C0A00] p-6">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const res = await api.post("/api/auth/login", data);
            auth.setToken(res.data.token);
            toast.success("Login successful");
            router.push("/admin/dashboard");
          } catch {
            toast.error("Invalid credentials");
          }
        })}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input className="w-full rounded-lg border p-3" placeholder="Email" {...register("email", { required: true })} />
        <div className="relative">
          <input type={show ? "text" : "password"} className="w-full rounded-lg border p-3 pr-10" placeholder="Password" {...register("password", { required: true })} />
          <button type="button" className="absolute right-3 top-3" onClick={() => setShow((v) => !v)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
        <button disabled={isSubmitting} className="w-full rounded-full bg-[#F97316] py-3 font-semibold text-white">{isSubmitting ? "Signing in..." : "Sign In"}</button>
      </form>
    </main>
  );
}
