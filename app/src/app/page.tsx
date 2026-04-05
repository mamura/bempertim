"use client";

import { useMemo, useState } from "react";
import { businesses as mockBusinesses } from "@/lib/mock-data";
import { calculateDistanceInKm, getCurrentPosition } from "@/lib/geolocation";
import { Business } from "@/types/business";
import { BusinessList } from "@/components/business/BusinessList";
import { CategoryFilter } from "@/components/business/CategoryFilter";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [items, setItems] = useState<Business[]>(mockBusinesses);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(mockBusinesses.map((item) => item.category))),
    []
  );

  const filteredBusinesses = useMemo(() => {
    if (selectedCategory === "Todas") {
      return items;
    }

    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  async function handleUseLocation() {
    setIsLoadingLocation(true);
    setLocationError("");

    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const withDistance = mockBusinesses
        .map((business) => ({
          ...business,
          distance: calculateDistanceInKm(
            latitude,
            longitude,
            business.latitude,
            business.longitude
          ),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

      setItems(withDistance);
    } catch {
      setLocationError("Não foi possível obter sua localização.");
    } finally {
      setIsLoadingLocation(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
            Bem Pertim
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Descubra pequenos negócios perto de você
          </h1>

          <p className="mt-4 text-lg leading-8 text-zinc-600">
            Encontre comércios locais, serviços e produtos próximos com uma
            experiência simples, rápida e acessível.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={isLoadingLocation}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoadingLocation ? "Obtendo localização..." : "Usar minha localização"}
            </button>
          </div>

          {locationError ? (
            <p className="mt-3 text-sm text-red-600">{locationError}</p>
          ) : null}
        </div>

        <div className="mt-10">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="mt-8">
          <BusinessList businesses={filteredBusinesses} />
        </div>
      </section>
    </main>
  );
}