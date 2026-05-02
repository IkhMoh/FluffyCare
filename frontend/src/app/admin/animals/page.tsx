"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AnimalForm } from "@/components/admin/AnimalForm";
import { AnimalsTable } from "@/components/admin/AnimalsTable";
import { api } from "@/lib/api";
import { mockAnimals } from "@/lib/mock-data";
import { Animal } from "@/types/animal";

export default function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("All");
  const [status, setStatus] = useState("All");
  const [editing, setEditing] = useState<Animal | null>(null);
  const [open, setOpen] = useState(false);

  const load = () => api.get("/api/admin/animals").then((res) => setAnimals(res.data)).catch(() => undefined);
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => animals.filter((a) => (species === "All" || a.species === species) && (status === "All" || a.status === status) && a.name.toLowerCase().includes(search.toLowerCase())), [animals, search, species, status]);

  async function saveAnimal(values: Partial<Animal>) {
    try {
      if (editing) await api.patch(`/api/admin/animals/${editing.id}`, values);
      else await api.post("/api/admin/animals", values);
      toast.success(editing ? "Animal updated" : "Animal created");
      setOpen(false);
      setEditing(null);
      load();
    } catch {
      toast.error("Failed to save animal");
    }
  }

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="mr-auto text-3xl font-bold">Animals Management</h1>
        <button className="rounded-full bg-[#F97316] px-4 py-2 text-white" onClick={() => setOpen(true)}>+ Add New Animal</button>
      </div>
      <div className="flex flex-wrap gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name..." className="rounded-lg border bg-white px-3 py-2" />
        <select value={species} onChange={(e) => setSpecies(e.target.value)} className="rounded-lg border bg-white px-3 py-2">{["All", "Dog", "Cat", "Bird", "Rabbit", "Other"].map((s) => <option key={s}>{s}</option>)}</select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border bg-white px-3 py-2">{["All", "Available", "Pending", "Adopted"].map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <AnimalsTable animals={filtered} onEdit={(a) => { setEditing(a); setOpen(true); }} onDelete={async (a) => { if (!window.confirm(`Delete ${a.name}?`)) return; await api.delete(`/api/admin/animals/${a.id}`).catch(() => toast.error("Delete failed")); load(); toast.success("Animal deleted"); }} />

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center">
              <h2 className="text-xl font-bold">{editing ? "Edit Animal" : "Add Animal"}</h2>
              <button className="ml-auto" onClick={() => { setOpen(false); setEditing(null); }}>Close</button>
            </div>
            <AnimalForm initial={editing || undefined} onSubmit={saveAnimal} />
          </div>
        </div>
      ) : null}
    </main>
  );
}
