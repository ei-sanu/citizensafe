import { Shield } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-cyber-dark p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-cyber-blue-500 flex items-center">
          <Shield className="text-cyber-green-500 mr-2" size={38} />
          CitizenSafe
        </Link>

        <div className="space-x-6">
          <Link
            to="/safety-protocols"
            className="text-gray-300 hover:text-cyber-blue-500"
          >
            Safety Protocols
          </Link>
          <Link
            to="/emergency-contacts"
            className="text-gray-300 hover:text-cyber-blue-500"
          >
            Emergency Contacts
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
