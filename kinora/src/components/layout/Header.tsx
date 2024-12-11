import React from 'react';
import { Link } from 'react-router-dom';
import { Film, BookOpen, ShoppingBag, Trophy } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Film className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Kinora</span>
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/scripts/public"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Public Scripts
              </Link>
              <Link
                to="/scripts/marketplace"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Marketplace
              </Link>
              <Link
                to="/competitions"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Competitions
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}