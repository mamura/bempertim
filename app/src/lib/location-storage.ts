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

export function saveUserLocation(data: UserLocation): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUserLocation(): UserLocation | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as UserLocation;
  } catch {
    return null;
  }
}

export function clearUserLocation(): void {
  localStorage.removeItem(STORAGE_KEY);
}