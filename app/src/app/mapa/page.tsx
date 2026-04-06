"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { getUserLocation, type UserLocation } from "@/lib/location-storage";
import { sobralBusinesses } from "@/lib/map-businesses";
import {
  Home,
  Search,
  Bell,
  Settings,
  Utensils,
  ShoppingCart,
  Pill,
  Dumbbell,
  Dog,
} from "lucide-react";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => <div className="bp-map-loading">Carregando mapa...</div>,
});

const SOBRAL_CENTER: [number, number] = [-3.688, -40.3498];
const DESKTOP_BREAKPOINT = 1280;

export default function MapaPage() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [recenterKey, setRecenterKey] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const storedLocation = getUserLocation();
    setLocation(storedLocation);
    setIsReady(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

    const syncLayout = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncLayout);
    };
  }, []);

  const userPosition = useMemo<[number, number] | null>(() => {
    if (location?.type !== "geolocation") {
      return null;
    }

    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }

    return [latitude, longitude];
  }, [location]);

  const mapCenter = useMemo<[number, number]>(() => {
    if (
      userPosition &&
      Number.isFinite(userPosition[0]) &&
      Number.isFinite(userPosition[1])
    ) {
      return userPosition;
    }

    return SOBRAL_CENTER;
  }, [userPosition]);

  function handleGoHome() {
    if (!userPosition) return;
    setRecenterKey((prev) => prev + 1);
  }

  if (!isReady) {
    return <div className="bp-map-loading">Carregando mapa...</div>;
  }

  return (
    <main className="bp-map-root">
      {!isDesktop ? (
        <div className="bp-map-mobile">
          <div className="bp-map-full">
            <LeafletMap
              center={mapCenter}
              businesses={sobralBusinesses}
              userPosition={userPosition}
              recenterKey={recenterKey}
            />
          </div>

          <button
            type="button"
            className="bp-map-fab"
            aria-label="Categorias"
          >
            <Utensils size={28} />
          </button>

          <nav className="bp-map-bottom-nav" aria-label="Navegação principal">
            <button
              type="button"
              className="bp-map-nav-button is-active"
              aria-label="Início"
              onClick={handleGoHome}
            >
              <Home size={26} />
            </button>

            <button
              type="button"
              className="bp-map-nav-button"
              aria-label="Buscar"
            >
              <Search size={26} />
            </button>

            <button
              type="button"
              className="bp-map-nav-button"
              aria-label="Notificações"
            >
              <Bell size={26} />
            </button>

            <button
              type="button"
              className="bp-map-nav-button"
              aria-label="Configurações"
            >
              <Settings size={26} />
            </button>
          </nav>
        </div>
      ) : (
        <div className="bp-map-desktop">
          <aside className="bp-map-sidebar">
            <div className="bp-map-sidebar-content">
              <button
                type="button"
                className="bp-map-logo-button"
                onClick={handleGoHome}
                aria-label="Voltar para minha localização"
              >
                <img
                  src="/bem-pertim-icon.svg"
                  alt="Bem Pertim"
                  className="bp-map-logo"
                />
              </button>

              <div className="bp-map-search">
                <input type="text" placeholder="Busca" />
                <button type="button" aria-label="Buscar">
                  <Search size={18} />
                </button>
              </div>

              <div className="bp-map-sidebar-nav bp-map-categories">
                <button
                  type="button"
                  className="bp-map-sidebar-nav-button"
                  onClick={handleGoHome}
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
                <button type="button" className="bp-map-sidebar-nav-button is-active">
                  <Utensils size={18} />
                  <span>Restaurantes</span>
                </button>

                <button type="button" className="bp-map-sidebar-nav-button">
                  <ShoppingCart size={18} />
                  <span>Mercados</span>
                </button>

                <button type="button" className="bp-map-sidebar-nav-button">
                  <Pill size={18} />
                  <span>Farmácias</span>
                </button>

                <button type="button" className="bp-map-sidebar-nav-button">
                  <Dumbbell size={18} />
                  <span>Academias</span>
                </button>

                <button type="button" className="bp-map-sidebar-nav-button">
                  <Dog size={18} />
                  <span>Petsop</span>
                </button>
              </div>

              <div className="bp-map-footer">
                <strong>Sobral</strong>
                <span>Ceará</span>
              </div>
            </div>
          </aside>

          <section className="bp-map-container">
            <LeafletMap
              center={mapCenter}
              businesses={sobralBusinesses}
              userPosition={userPosition}
              recenterKey={recenterKey}
            />
          </section>
        </div>
      )}
    </main>
  );
}