export function FilterBar({
  species,
  setSpecies,
  search,
  setSearch,
}: {
  species: string;
  setSpecies: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row">
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className="rounded-full border bg-white px-4 py-2"
      >
        {["All", "Dog", "Cat", "Bird", "Rabbit", "Other"].map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="w-full rounded-full border bg-white px-4 py-2"
      />
    </div>
  );
}
