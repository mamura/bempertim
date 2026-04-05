type Props = {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
};

export function CategoryFilter({ categories, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("Todas")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          selected === "Todas"
            ? "bg-emerald-600 text-white"
            : "bg-white text-zinc-700 border border-zinc-200"
        }`}
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selected === category
              ? "bg-emerald-600 text-white"
              : "bg-white text-zinc-700 border border-zinc-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}