export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NearbyPlace {
  id: string;
  name: string;
  vicinity: string;
  location: Coordinates;
  distance?: number;
  types: string[];
  isOpen?: boolean;
  placeId: string;
  icon?: string;
}

export type PlaceType = 'police' | 'hospital';

export interface MapStyleElement {
  featureType: string;
  elementType: string;
  stylers: { [key: string]: string | number }[];
}