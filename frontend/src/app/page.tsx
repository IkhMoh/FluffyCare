"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimalCard } from "@/components/public/AnimalCard";
import { FilterBar } from "@/components/public/FilterBar";
import { HeroSection } from "@/components/public/HeroSection";
import { api } from "@/lib/api";
import { mockAnimals } from "@/lib/mock-data";
import { Animal } from "@/types/animal";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

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
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-10 p-6 md:p-10">
        <div id="home"> <HeroSection /></div>

        <section id="animals">
          <h2 className="mb-4 text-3xl font-bold">Animals Ready for Adoption</h2>
          <FilterBar species={species} setSpecies={setSpecies} search={search} setSearch={setSearch} />
          {loading ? <div className="h-24 animate-pulse rounded-2xl bg-white/60" /> : null}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </section>
        <section className="mx-auto mt-12 grid max-w-7xl gap-6 rounded-3xl bg-white p-4 md:grid-cols-4">
          {/* Card 1 */}
          <div className="group flex h-40 flex-col items-center justify-center rounded-2xl bg-[#FFF7ED] text-center shadow-sm transition ">
            <p className="text-4xl font-black text-[#F97316] transition-transform duration-200">
              240+
            </p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Total Animals Rescued
            </p>
          </div>
          {/* Card 2 */}
          <div className="group flex h-40 flex-col items-center justify-center rounded-2xl bg-[#FFF7ED] text-center shadow-sm transition ">
            <p className="text-4xl font-black text-[#F97316] transition-transform duration-200">
              89
            </p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Adoptions This Year
            </p>
          </div>
          {/* Card 3 */}
          <div className="group flex h-40 flex-col items-center justify-center rounded-2xl bg-[#FFF7ED] text-center shadow-sm transition ">
            <p className="text-4xl font-black text-[#F97316] transition-transform duration-200">
              170+
            </p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Happy Families
            </p>
          </div>
          {/* Card 4 */}
          <div className="group flex h-40 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#F97316] to-orange-400 text-center text-white shadow-md transition ">
            <p className="text-4xl font-black transition-transform duration-200  ">
              6
            </p>
            <p className="mt-2 text-sm font-medium text-white/90">
              Animals Available Now
            </p>
          </div>

        </section>
      </main>
      <section id="about">
        <Footer />
      </section>

    </>
  );
}
