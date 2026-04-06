"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { getUserLocation } from "@/lib/location-storage";
import { sobralBusinesses } from "@/lib/map-businesses";
import {
  Home,
  Search,
  Bell,
  Settings,
  Utensils,
} from "lucide-react";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => <div className="bp-map-loading">Carregando mapa...</div>,
});

export default function MapaPage() {
  const location = getUserLocation();

  const mapCenter = useMemo<[number, number]>(() => {
    if (location?.type === "geolocation") {
      return [location.latitude, location.longitude];
    }

    return [-3.688, -40.3498];
  }, [location]);

  return (
    <main className="bp-map-root">
      <div className="bp-map-mobile">
        <div className="bp-map-full">
          <LeafletMap center={mapCenter} businesses={sobralBusinesses} />
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

      <div className="bp-map-desktop">
        <aside className="bp-map-sidebar">
          <div className="bp-map-sidebar-content">
            <img
              src="/bem-pertim-icon.svg"
              alt="Bem Pertim"
              className="bp-map-logo"
            />

            <p className="bp-map-sidebar-title">Filtre por categoria</p>

            <div className="bp-map-search">
              <input type="text" placeholder="Busca" />
            </div>

            <div className="bp-map-categories">
              <button type="button" className="is-active">
                🍴 Restaurantes
              </button>
              <button type="button">Mercados</button>
              <button type="button">Farmácias</button>
              <button type="button">Academias</button>
            </div>

            <div className="bp-map-footer">
              <strong>Sobral</strong>
              <span>Ceará</span>
            </div>
          </div>
        </aside>

        <section className="bp-map-container">
          <LeafletMap center={mapCenter} businesses={sobralBusinesses} />
        </section>
      </div>
    </main>
  );
}