import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, AlertCircle } from 'lucide-react';
import { Coordinates, NearbyPlace } from '../types';
import { GOOGLE_MAPS_API_KEY, DEFAULT_CENTER, CYBERPUNK_MAP_STYLE } from '../constants';

interface MapProps {
  userLocation: Coordinates | null;
  nearbyPlaces: NearbyPlace[];
  isLoading: boolean;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const Map: React.FC<MapProps> = ({ userLocation, nearbyPlaces, isLoading }) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null);
  
  const center = userLocation || DEFAULT_CENTER;

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapInstance(map);
    map.setOptions({
      styles: CYBERPUNK_MAP_STYLE,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });
  }, []);

  useEffect(() => {
    if (mapInstance && userLocation) {
      mapInstance.panTo(userLocation);
    }
  }, [mapInstance, userLocation]);

  const getMarkerIcon = (type: string[]) => {
    if (type.includes('police')) {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(40, 40)
      };
    }
    if (type.includes('hospital')) {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40)
      };
    }
    return {
      url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      scaledSize: new google.maps.Size(40, 40)
    };
  };

  return (
    <div className="map-container">
      {isLoading && (
        <div className="absolute inset-0 bg-cyber-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="text-cyber-green-500 font-tech animate-pulse flex flex-col items-center">
            <div className="border-t-2 border-cyber-green-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p>LOCATING EMERGENCY SERVICES...</p>
          </div>
        </div>
      )}
      
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onLoad={onMapLoad}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: 'M 0, 0 m -10, 0 a 10, 10 0 1, 0 20, 0 a 10, 10 0 1, 0 -20, 0',
                fillColor: '#00ff00',
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 2,
                scale: 1,
              }}
              animation={google.maps.Animation.BOUNCE}
              title="Your Location"
            />
          )}

          {nearbyPlaces.map((place) => (
            <Marker
              key={place.id}
              position={place.location}
              icon={getMarkerIcon(place.types)}
              onClick={() => setSelectedPlace(place)}
            />
          ))}

          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.location}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="bg-cyber-dark text-white p-2 max-w-xs font-rajdhani border-l-4 border-cyber-green-500">
                <h3 className="font-bold text-cyber-green-500">{selectedPlace.name}</h3>
                <p className="text-sm text-gray-300">{selectedPlace.vicinity}</p>
                <p className="text-xs mt-1">
                  {selectedPlace.distance !== undefined && (
                    <span className="text-cyber-green-300">
                      {selectedPlace.distance.toFixed(2)} km away
                    </span>
                  )}
                </p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.location.lat},${selectedPlace.location.lng}&destination_place_id=${selectedPlace.placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs flex items-center gap-1 text-cyber-blue-500 hover:underline"
                >
                  <MapPin size={12} />
                  Get directions
                </a>
              </div>
            </InfoWindow>
          )}

          {!userLocation && !isLoading && (
            <div className="absolute top-2 left-0 right-0 mx-auto w-max bg-cyber-black bg-opacity-80 text-white p-2 rounded-md flex items-center gap-2 font-tech text-sm">
              <AlertCircle size={16} className="text-cyber-yellow-500" />
              Location access required to show your position
            </div>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;