"use client";

import { useForm } from "react-hook-form";
import { Animal } from "@/types/animal";

type Props = {
  initial?: Partial<Animal>;
  onSubmit: (values: Partial<Animal>) => Promise<void>;
};

export function AnimalForm({ initial, onSubmit }: Props) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Partial<Animal>>({ defaultValues: initial });
  return (
    <form onSubmit={handleSubmit(async (data) => onSubmit(data))} className="grid gap-3 md:grid-cols-2">
      <input className="rounded-lg border p-2" placeholder="Name" {...register("name", { required: true, minLength: 2 })} />
      <select className="rounded-lg border p-2" {...register("species", { required: true })}>
        {["Dog", "Cat", "Bird", "Rabbit", "Other"].map((s) => <option key={s}>{s}</option>)}
      </select>
      <input className="rounded-lg border p-2" placeholder="Breed" {...register("breed")} />
      <input className="rounded-lg border p-2" type="number" placeholder="Age (months)" {...register("age", { valueAsNumber: true })} />
      <select className="rounded-lg border p-2" {...register("gender", { required: true })}>
        {["Male", "Female"].map((g) => <option key={g}>{g}</option>)}
      </select>
      <select className="rounded-lg border p-2" {...register("status", { required: true })}>
        {["Available", "Pending", "Adopted"].map((s) => <option key={s}>{s}</option>)}
      </select>
      <textarea className="rounded-lg border p-2 md:col-span-2" placeholder="Description" {...register("description")} />
      <textarea className="rounded-lg border p-2 md:col-span-2" placeholder="Health Notes" {...register("healthNotes")} />
      <input className="rounded-lg border p-2 md:col-span-2" placeholder="Image URL" {...register("imageUrl")} />
      <button disabled={isSubmitting} className="rounded-full bg-[#F97316] px-4 py-2 text-white md:col-span-2">
        {isSubmitting ? "Saving..." : "Save Animal"}
      </button>
    </form>
  );
}
