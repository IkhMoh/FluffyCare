"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimalCard } from "@/components/public/AnimalCard";
import { FilterBar } from "@/components/public/FilterBar";
import { HeroSection } from "@/components/public/HeroSection";
import { api } from "@/lib/api";
import { mockAnimals } from "@/lib/mock-data";
import { Animal } from "@/types/animal";

export default function HomePage() {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals.filter((a) => a.status === "Available"));
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/api/animals")
      .then((res) => setAnimals(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      animals.filter(
        (animal) =>
          (species === "All" || animal.species === species) &&
          animal.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [animals, search, species],
  );

  return (
    <main className="mx-auto max-w-7xl space-y-10 p-6 md:p-10">
      <HeroSection />
      <section>
        <h2 className="mb-4 text-3xl font-bold">Animals Ready for Adoption</h2>
        <FilterBar species={species} setSpecies={setSpecies} search={search} setSearch={setSearch} />
        {loading ? <div className="h-24 animate-pulse rounded-2xl bg-white/60" /> : null}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>
      <section className="grid gap-4 rounded-2xl bg-white p-6 md:grid-cols-3">
        <div><p className="text-3xl font-black text-[#F97316]">240+</p><p>Total Animals Rescued</p></div>
        <div><p className="text-3xl font-black text-[#F97316]">89</p><p>Adoptions This Year</p></div>
        <div><p className="text-3xl font-black text-[#F97316]">170+</p><p>Happy Families</p></div>
      </section>
    </main>
  );
}
