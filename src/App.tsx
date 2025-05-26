import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useGeolocation } from './hooks/useGeolocation';
import { searchNearbyPlaces } from './services/places';
import { NearbyPlace } from './types';

// Components
import EmergencyButtons from './components/EmergencyButtons';
import EmergencyContacts from './components/EmergencyContacts';
import Footer from './components/Footer';
import Header from './components/Header';
import LocationPermissionModal from './components/LocationPermissionModal';
import Map from './components/Map';
import NearbyServicesPanel from './components/NearbyServicesPanel';
import SafetyProtocols from './components/SafetyProtocols';

const App = () => {
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(true);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [placesLoading, setPlacesLoading] = useState<boolean>(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { location, error: locationError, loading: locationLoading } = useGeolocation();

  // Load nearby places when coordinates change
  useEffect(() => {
    const loadNearbyPlaces = async () => {
      if (!location || !mapInstance) return;

      setPlacesLoading(true);
      setPlacesError(null);

      try {
        // Load police stations
        const policeStations = await searchNearbyPlaces(
          mapInstance,
          location,
          'police'
        );

        // Load hospitals
        const hospitals = await searchNearbyPlaces(
          mapInstance,
          location,
          'hospital'
        );

        // Combine and sort by distance
        const combined = [...policeStations, ...hospitals];
        combined.sort((a, b) => (a.distance || 0) - (b.distance || 0));

        setNearbyPlaces(combined);
      } catch (err) {
        console.error('Error loading nearby places:', err);
        setPlacesError('Failed to load nearby emergency services. Please try again.');
      } finally {
        setPlacesLoading(false);
      }
    };

    loadNearbyPlaces();
  }, [location, mapInstance]);

  const handleMapLoad = (map: google.maps.Map) => {
    setMapInstance(map);
  };

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cyber-black text-white font-rajdhani">
        <Header showMenu={showMenu} toggleMenu={toggleMenu} />

        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden fixed inset-0 z-30 bg-cyber-black bg-opacity-95 pt-16">
            <nav className="container mx-auto px-4 py-6 flex flex-col items-center space-y-6">
              <div className="w-full p-3 border border-cyber-green-500 text-center">
                <span className="text-cyber-green-300 font-tech">SAFETY_PROTOCOLS</span>
              </div>
              <div className="w-full p-3 border border-cyber-green-500 text-center">
                <span className="text-cyber-green-300 font-tech">EMERGENCY_CONTACTS</span>
              </div>
              <div className="w-full p-3 bg-cyber-green-500 text-cyber-black text-center font-tech">
                LOGIN
              </div>
            </nav>
          </div>
        )}

        <main className="container mx-auto px-4 py-6 flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold">
                      <span className="text-cyber-green-500">Emergency</span> Safety Assistant
                    </h1>
                    <p className="text-gray-400 mt-2">
                      Get immediate access to emergency services and share your location with trusted contacts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="h-80 md:h-96 lg:h-[500px]">
                        {locationError && (
                          <div className="bg-cyber-red-500 bg-opacity-10 border border-cyber-red-500 p-4 m-4 rounded">
                            <p className="text-white">{locationError}</p>
                          </div>
                        )}
                        <Map
                          userLocation={location}
                          nearbyPlaces={nearbyPlaces}
                          isLoading={locationLoading || placesLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <EmergencyButtons userLocation={location} />
                      <NearbyServicesPanel
                        places={nearbyPlaces}
                        isLoading={locationLoading || placesLoading}
                        error={placesError}
                      />
                    </div>
                  </div>

                  <div className="mt-8 cyber-panel">
                    <h2 className="cyber-panel-title">Safety Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="p-4 bg-cyber-gray rounded-md">
                        <h3 className="text-cyber-green-500 font-bold mb-2">Stay Alert</h3>
                        <p className="text-sm text-gray-300">
                          Be aware of your surroundings. If you feel unsafe, move to a well-lit, populated area.
                        </p>
                      </div>
                      <div className="p-4 bg-cyber-gray rounded-md">
                        <h3 className="text-cyber-green-500 font-bold mb-2">Share Location</h3>
                        <p className="text-sm text-gray-300">
                          Always let someone know where you're going and when you expect to arrive.
                        </p>
                      </div>
                      <div className="p-4 bg-cyber-gray rounded-md">
                        <h3 className="text-cyber-green-500 font-bold mb-2">Emergency Contacts</h3>
                        <p className="text-sm text-gray-300">
                          Save emergency numbers in your phone: Police (100), Ambulance (108), Women's Helpline (1091).
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route path="/safety-protocols" element={<SafetyProtocols />} />
            <Route path="/emergency-contacts" element={<EmergencyContacts />} />
          </Routes>
        </main>

        <Footer />

        <LocationPermissionModal
          onRequestPermission={() => { }}
          permissionDenied={!!locationError}
          isVisible={showPermissionModal && (!location || !!locationError)}
          onClose={() => setShowPermissionModal(false)}
        />
      </div>
    </Router>
  );
};

export default App;
