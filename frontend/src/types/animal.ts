export type AnimalStatus = "Available" | "Pending" | "Adopted";
export type AnimalSpecies = "Dog" | "Cat" | "Bird" | "Rabbit" | "Other";

export interface Animal {
  id: number;
  name: string;
  species: AnimalSpecies;
  breed?: string | null;
  age: number;
  gender: "Male" | "Female";
  color?: string | null;
  weight?: number | null;
  status: AnimalStatus;
  description?: string | null;
  imageUrl?: string | null;
  healthNotes?: string | null;
  arrivalDate: string;
  createdAt: string;
  updatedAt: string;
}
