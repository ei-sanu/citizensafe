import React from 'react';
import { AlertTriangle, MapPin, Shield } from 'lucide-react';

interface LocationPermissionModalProps {
  onRequestPermission: () => void;
  permissionDenied: boolean;
  isVisible: boolean;
  onClose?: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  onRequestPermission,
  permissionDenied,
  isVisible,
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-black bg-opacity-80 backdrop-blur-sm">
      <div className="cyber-border max-w-md w-full p-6 bg-cyber-dark rounded-lg shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-cyber-green-500" size={24} />
            <h2 className="text-2xl font-bold text-cyber-green-500">Location Access</h2>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>

        {permissionDenied ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-cyber-red-500 bg-opacity-20 rounded-md border border-cyber-red-500">
              <AlertTriangle className="text-cyber-red-500" size={20} />
              <p className="text-white">
                Location access was denied. This app requires your location to provide emergency services.
              </p>
            </div>
            <p className="text-gray-300">
              To enable location services:
            </p>
            <ol className="list-decimal pl-5 text-gray-300 space-y-2">
              <li>Check your browser permissions</li>
              <li>Make sure location services are enabled on your device</li>
              <li>Refresh the page and try again</li>
            </ol>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300">
              To provide you with emergency services and locate nearby help, this app needs access to your current location.
            </p>
            
            <div className="flex items-start gap-3 p-3 bg-cyber-green-500 bg-opacity-10 rounded-md border border-cyber-green-500">
              <Shield className="text-cyber-green-500 mt-1" size={20} />
              <div>
                <h3 className="font-bold text-white">Your privacy is protected</h3>
                <p className="text-sm text-gray-300">
                  Your location is only used to find nearby emergency services and shared only when you explicitly request help.
                </p>
              </div>
            </div>

            <div className="font-tech text-xs text-gray-400">
              <p className="mb-1">CITIZEN SAFETY PROTOCOL v1.9.3</p>
              <p>GPS TRACKING MODULE STANDBY</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={onRequestPermission}
            className="w-full location-btn"
          >
            <MapPin size={18} />
            {permissionDenied ? 'Try Again' : 'Share My Location'}
          </button>
          
          {!permissionDenied && (
            <p className="mt-3 text-xs text-center text-gray-400">
              By sharing your location, you agree to our{' '}
              <a href="#" className="text-cyber-green-300 hover:underline">
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;