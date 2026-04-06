"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cityOptions } from "@/lib/location-options";
import { saveUserLocation } from "@/lib/location-storage";

export default function LocalizacaoPage() {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [error, setError] = useState("");

  const selectedCity = useMemo(
    () => cityOptions.find((option) => option.value === city) ?? null,
    [city]
  );

  const districtOptions = selectedCity?.districts ?? [];

  function handleCityChange(value: string) {
    setCity(value);
    setDistrict("");
    setError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selectedCity) {
      setError("Selecione uma cidade para continuar.");
      return;
    }

    const selectedDistrict = districtOptions.find(
      (option) => option.value === district
    );

    if (!selectedDistrict) {
      setError("Selecione um bairro para continuar.");
      return;
    }

    saveUserLocation({
      type: "manual",
      city: selectedCity.label,
      district: selectedDistrict.label,
    });

    router.push("/mapa");
  }

  return (
    <main className="bp-gradient-main min-h-screen">
      <div className="bp-container">
        <div className="flex min-h-screen items-center py-10">
          <section className="bp-location-card mx-auto w-full max-w-[640px]">
            <div className="bp-stack-sm">
              <span className="bp-badge bp-badge--primary">Localização</span>

              <h1 className="bp-title-section text-white">
                Escolha sua cidade e seu bairro
              </h1>

              <p className="bp-text-lead bp-text-soft">
                Se preferir, você pode continuar manualmente selecionando a sua
                região.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bp-location-form">
              <div>
                <label htmlFor="city" className="bp-label bp-label--light">
                  Cidade
                </label>

                <select
                  id="city"
                  value={city}
                  onChange={(event) => handleCityChange(event.target.value)}
                  className="bp-select"
                >
                  <option value="">Selecione uma cidade</option>

                  {cityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="district" className="bp-label bp-label--light">
                  Bairro
                </label>

                <select
                  id="district"
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  className="bp-select"
                  disabled={!selectedCity}
                >
                  <option value="">Selecione um bairro</option>

                  {districtOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {error ? <p className="bp-form-error">{error}</p> : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="bp-btn bp-btn--primary">
                  Continuar
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="bp-btn bp-btn--ghost"
                >
                  Voltar
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}