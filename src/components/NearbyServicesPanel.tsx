import React from 'react';
import { Phone, Navigation, Loader } from 'lucide-react';
import { NearbyPlace } from '../types';

interface NearbyServicesPanelProps {
  places: NearbyPlace[];
  isLoading: boolean;
  error: string | null;
}

const NearbyServicesPanel: React.FC<NearbyServicesPanelProps> = ({ 
  places, 
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="cyber-panel h-80">
        <h2 className="cyber-panel-title">Nearby Emergency Services</h2>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <Loader className="animate-spin text-cyber-green-500 mb-2" size={24} />
            <p className="text-cyber-green-500 font-tech">SCANNING AREA...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cyber-panel h-80">
        <h2 className="cyber-panel-title">Nearby Emergency Services</h2>
        <div className="p-4 bg-cyber-red-500 bg-opacity-10 border border-cyber-red-500 rounded-md mt-4">
          <p className="text-white">{error}</p>
        </div>
      </div>
    );
  }

  const policeStations = places.filter(place => place.types.includes('police'));
  const hospitals = places.filter(place => place.types.includes('hospital'));

  return (
    <div className="cyber-panel">
      <h2 className="cyber-panel-title">Nearby Emergency Services</h2>
      
      <div className="mt-2 space-y-4">
        <div>
          <h3 className="text-cyber-blue-500 font-tech text-sm uppercase mb-1 flex items-center">
            <span className="inline-block w-2 h-2 bg-cyber-blue-500 mr-2"></span>
            Police Stations ({policeStations.length})
          </h3>
          <div className="bg-cyber-black bg-opacity-30 rounded-sm max-h-32 overflow-y-auto">
            {policeStations.length > 0 ? (
              <ul>
                {policeStations.map(place => (
                  <li key={place.id} className="place-item">
                    <span className="place-item-name">{place.name}</span>
                    <span className="place-item-distance">{place.distance?.toFixed(2)} km</span>
                    <div className="flex ml-2">
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}&destination_place_id=${place.placeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-cyber-green-500 hover:bg-cyber-green-500 hover:text-cyber-black rounded-sm transition-colors"
                        title="Get directions"
                      >
                        <Navigation size={14} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-2 text-gray-400 text-sm">No police stations found within 7km</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-cyber-red-500 font-tech text-sm uppercase mb-1 flex items-center">
            <span className="inline-block w-2 h-2 bg-cyber-red-500 mr-2"></span>
            Hospitals ({hospitals.length})
          </h3>
          <div className="bg-cyber-black bg-opacity-30 rounded-sm max-h-32 overflow-y-auto">
            {hospitals.length > 0 ? (
              <ul>
                {hospitals.map(place => (
                  <li key={place.id} className="place-item">
                    <span className="place-item-name">{place.name}</span>
                    <span className="place-item-distance">{place.distance?.toFixed(2)} km</span>
                    <div className="flex ml-2">
                      <a 
                        href={`tel:108`}
                        className="p-1 text-cyber-red-500 hover:bg-cyber-red-500 hover:text-cyber-black rounded-sm transition-colors mr-1"
                        title="Call Ambulance"
                      >
                        <Phone size={14} />
                      </a>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}&destination_place_id=${place.placeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-cyber-green-500 hover:bg-cyber-green-500 hover:text-cyber-black rounded-sm transition-colors"
                        title="Get directions"
                      >
                        <Navigation size={14} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-2 text-gray-400 text-sm">No hospitals found within 7km</p>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mt-4 italic">
        Click on any marker on the map for more details.
      </p>
    </div>
  );
};

export default NearbyServicesPanel;