import React from 'react';
import { Shield, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-black border-t border-cyber-green-500 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="text-cyber-green-500 mr-2" size={20} />
            <span className="text-xl font-bold text-white">
              <span className="text-cyber-green-500">Citizen</span>Safe
            </span>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-cyber-green-400 hover:text-cyber-green-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-cyber-green-400 hover:text-cyber-green-500 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
          
          <div className="text-sm text-gray-400 font-tech">
            <span className="block text-center md:text-right">© 2025 CitizenSafe</span>
            <span className="block text-center md:text-right">v1.3.7 | SYSTEM OPERATIONAL</span>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-gray-500 text-center md:text-left">
          <p className="mb-2">
            This application is designed for personal safety in emergencies. 
            Always call emergency services directly when possible.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4">
            <a href="#" className="text-cyber-green-400 hover:underline">Privacy Policy</a>
            <a href="#" className="text-cyber-green-400 hover:underline">Terms of Service</a>
            <a href="#" className="text-cyber-green-400 hover:underline">Emergency Resources</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;