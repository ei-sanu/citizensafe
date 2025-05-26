import { NearbyPlace, Coordinates, PlaceType } from '../types';
import { SEARCH_RADIUS } from '../constants';

// Calculate distance between two coordinates in kilometers
export const calculateDistance = (
  point1: Coordinates,
  point2: Coordinates
): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Search for nearby places using Google Places API
export const searchNearbyPlaces = async (
  map: google.maps.Map | null,
  userLocation: Coordinates,
  placeType: PlaceType
): Promise<NearbyPlace[]> => {
  if (!map) return [];

  const service = new google.maps.places.PlacesService(map);
  
  return new Promise((resolve, reject) => {
    const request = {
      location: userLocation,
      radius: SEARCH_RADIUS,
      type: placeType === 'police' ? 'police' : 'hospital'
    };

    service.nearbySearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const places: NearbyPlace[] = results.map((place) => {
            const location = {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0
            };

            const distance = calculateDistance(userLocation, location);

            return {
              id: place.place_id || Math.random().toString(36).substr(2, 9),
              name: place.name || 'Unknown Place',
              vicinity: place.vicinity || '',
              location,
              distance,
              types: place.types || [],
              isOpen: place.opening_hours?.isOpen() || false,
              placeId: place.place_id || '',
              icon: place.icon || ''
            };
          });

          // Sort by distance
          places.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          resolve(places);
        } else {
          reject(new Error(`Places request failed with status: ${status}`));
        }
      }
    );
  });
};