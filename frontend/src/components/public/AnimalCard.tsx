"use client";

import { Animal } from "@/types/animal";

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-[#FFF7ED] shadow-md">
      <img src={animal.imageUrl || ""} alt={animal.name} className="h-52 w-full object-cover" />
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{animal.name}</h3>
          <span className="rounded-full bg-white px-3 py-1 text-xs">{animal.species}</span>
        </div>
        <p className="text-sm text-gray-600">{animal.age} months · {animal.gender}</p>
        <span className="rounded-full bg-green-200 px-3 py-1 text-xs">{animal.status}</span>
        <p className="text-sm text-gray-700">{animal.description}</p>
        <button className="rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-white">Learn More</button>
      </div>
    </article>
  );
}
