import { AlertTriangle, Phone, Send } from 'lucide-react';
import React from 'react';
import { Coordinates } from '../types';

interface EmergencyButtonsProps {
  userLocation: Coordinates | null;
}

const EmergencyButtons: React.FC<EmergencyButtonsProps> = ({ userLocation }) => {
  const EMERGENCY_CONTACT = "+917008450074";

  const handleSendAlert = () => {
    if (!userLocation) {
      alert('Unable to access your location. Please allow location access to use this feature.');
      return;
    }

    const message = `EMERGENCY ALERT! I need immediate assistance. My current location: https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;

    // Create SMS link with pre-filled recipient and message
    const smsLink = `sms:${EMERGENCY_CONTACT}?body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
  };

  const handleCallPolice = () => {
    window.location.href = `tel:100`;
  };

  return (
    <div className="cyber-panel">
      <h2 className="cyber-panel-title">Emergency Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <button
          onClick={handleCallPolice}
          className="call-btn animate-pulse-fast"
          aria-label="Call Police"
        >
          <Phone size={20} />
          Call Police
        </button>

        <button
          onClick={handleSendAlert}
          className="alert-btn"
          disabled={!userLocation}
          aria-label="Send Alert SMS"
        >
          <Send size={20} />
          Send Alert
        </button>
      </div>

      {!userLocation && (
        <div className="mt-4 p-3 bg-cyber-dark rounded-md border border-cyber-yellow-500 flex items-start gap-2">
          <AlertTriangle className="text-cyber-yellow-500 mt-1" size={16} />
          <p className="text-sm text-gray-300">
            Location access is required to share your position in emergency alerts.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmergencyButtons;
