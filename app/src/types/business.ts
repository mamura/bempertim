export type Business = {
  id: number;
  name: string;
  category: string;
  phone: string;
  description?: string;
  latitude: number;
  longitude: number;
  address?: string;
  distance?: number;
};