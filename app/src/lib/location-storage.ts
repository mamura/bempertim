export type UserLocation =
  | {
      type: "geolocation";
      latitude: number;
      longitude: number;
    }
  | {
      type: "manual";
      city: string;
      district: string;
    };

const STORAGE_KEY = "bp:user_location";

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function saveUserLocation(data: UserLocation): void {
  if (typeof window === "undefined") return;

  if (data.type === "geolocation") {
    if (!isFiniteNumber(data.latitude) || !isFiniteNumber(data.longitude)) {
      console.error("saveUserLocation recebeu coordenadas inválidas", data);
      return;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUserLocation(): UserLocation | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  console.log("raw location storage", raw);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    console.log("parsed location storage", parsed);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "type" in parsed &&
      parsed.type === "geolocation" &&
      "latitude" in parsed &&
      "longitude" in parsed
    ) {
      const latitude = Number((parsed as { latitude: unknown }).latitude);
      const longitude = Number((parsed as { longitude: unknown }).longitude);

      console.log("latitude normalizada", latitude);
      console.log("longitude normalizada", longitude);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        console.error("Coordenadas inválidas no localStorage", parsed);
        return null;
      }

      return {
        type: "geolocation",
        latitude,
        longitude,
      };
    }

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "type" in parsed &&
      parsed.type === "manual" &&
      "city" in parsed &&
      "district" in parsed
    ) {
      return {
        type: "manual",
        city: String((parsed as { city: unknown }).city ?? ""),
        district: String((parsed as { district: unknown }).district ?? ""),
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao ler localStorage", error);
    return null;
  }
}

export function clearUserLocation(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}