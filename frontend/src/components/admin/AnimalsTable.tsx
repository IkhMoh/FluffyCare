"use client";

import { format } from "date-fns";
import { Animal } from "@/types/animal";

export function AnimalsTable({
  animals,
  onEdit,
  onDelete,
}: {
  animals: Animal[];
  onEdit: (a: Animal) => void;
  onDelete: (a: Animal) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-md">
      <table className="w-full min-w-[960px] text-left text-sm">
        <thead><tr className="border-b">{["Photo", "Name", "Species", "Breed", "Age", "Gender", "Status", "Health", "Arrival Date", "Actions"].map((h) => <th className="p-2" key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id} className="border-b">
              <td className="p-2"><img src={animal.imageUrl || ""} alt={animal.name} className="h-10 w-10 rounded-full object-cover" /></td>
              <td className="p-2 font-semibold">{animal.name}</td>
              <td className="p-2">{animal.species}</td>
              <td className="p-2">{animal.breed || "-"}</td>
              <td className="p-2">{animal.age} months</td>
              <td className="p-2">{animal.gender}</td>
              <td className="p-2">{animal.status}</td>
              <td className="p-2">{animal.healthNotes || "-"}</td>
              <td className="p-2">{format(new Date(animal.arrivalDate), "MMM d, yyyy")}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onEdit(animal)} className="rounded bg-orange-100 px-2 py-1">Edit</button>
                <button onClick={() => onDelete(animal)} className="rounded bg-red-100 px-2 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
