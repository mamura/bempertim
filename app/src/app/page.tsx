"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCurrentPosition } from "@/lib/geolocation";
import { saveUserLocation } from "@/lib/location-storage";

export default function HomePage() {
  const router = useRouter();

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  async function handleUseLocation() {
    console.log("clicou no botão de localização");
    setIsLoadingLocation(true);
    setLocationError("");

    try {
      const position = await getCurrentPosition();

      console.log("position.coords.latitude", position.coords.latitude);
      console.log("position.coords.longitude", position.coords.longitude);

      const payload = {
        type: "geolocation" as const,
        latitude: Number(position.coords.latitude),
        longitude: Number(position.coords.longitude),
      };

      console.log("payload salvo", payload);

      saveUserLocation(payload);

      console.log(
        "localStorage salvo",
        localStorage.getItem("bp:user_location")
      );

      router.push("/mapa");
    } catch (error) {
      console.error(error);

      setLocationError(
        "Não foi possível acessar sua localização. Você pode escolher sua cidade e bairro manualmente."
      );
    } finally {
      setIsLoadingLocation(false);
    }
  }

  function handleManualLocation() {
    router.push("/localizacao");
  }

  return (
    <main className="bp-gradient-main bp-hero-layout">
      <div className="bp-container bp-hero-wrapper">
        <div className="bp-hero-grid">
          <section className="bp-hero-left">
            <div className="bp-hero-brand">
              <Image
                src="/bem-pertim.svg"
                alt="Bem Pertim"
                width={430}
                height={140}
                priority
                className="bp-hero-logo"
              />
            </div>

            <div className="bp-hero-copy">
              <h1 className="bp-title-hero">
                Tenha tudo do seu bairro na palma da sua mão
              </h1>

              <p className="bp-text-lead bp-text-soft bp-hero-description">
                O Bem Pertim te mostra várias informações do seu bairro:
                eventos, delivery, aluguéis, serviços públicos e muito mais.
              </p>
            </div>

            <div className="bp-hero-actions">
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={isLoadingLocation}
                className="bp-btn bp-btn--primary bp-hero-button"
              >
                {isLoadingLocation
                  ? "Obtendo localização..."
                  : "Usar minha localização"}
              </button>

              <button
                type="button"
                onClick={handleManualLocation}
                className="bp-btn bp-btn--ghost bp-hero-button"
              >
                Escolher cidade e bairro
              </button>
            </div>

            {locationError ? (
              <p className="bp-hero-error">{locationError}</p>
            ) : null}
          </section>
        </div>
      </div>

      <section className="bp-hero-visual" aria-hidden="true">
        <img
          src="/bg-hero.svg"
          alt=""
          className="bp-hero-illustration"
        />
      </section>
    </main>
  );
}