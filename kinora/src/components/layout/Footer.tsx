import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Kinora</span>
          </div>
          <nav className="flex space-x-8">
            <Link to="/about" className="text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-900">
              Terms
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Kinora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}