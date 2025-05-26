import { MapStyleElement } from '../types';

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

export const DEFAULT_CENTER = {
  lat: 28.6139, // Default to New Delhi (change as needed)
  lng: 77.2090
};

export const SEARCH_RADIUS = 7000; // 7km radius in meters

export const EMERGENCY_NUMBER = "100"; // Police emergency number (change as needed)

// Default SMS message template
export const SMS_TEMPLATE = (phoneNumber: string, lat: number, lng: number) => 
  `🚨 EMERGENCY! I need help. My number is ${phoneNumber}. Location: https://maps.google.com/?q=${lat},${lng}`;

// Cyberpunk map style
export const CYBERPUNK_MAP_STYLE: MapStyleElement[] = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#00ff00"}]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#000000"}, {"visibility": "on"}, {"weight": 2}]
  },
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [{"color": "#121212"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#1a1a1a"}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{"color": "#2a2a2a"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{"color": "#3a3a3a"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#000033"}]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#1a1a1a"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#003300"}]
  }
];