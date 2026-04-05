import { Business } from "@/types/business";
import { BusinessCard } from "./BusinessCard";

type Props = {
  businesses: Business[];
};

export function BusinessList({ businesses }: Props) {
  if (businesses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-500">
        Nenhum comércio encontrado para esse filtro.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}