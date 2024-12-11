import React from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceScript } from '../../../lib/types';
import { SCRIPT_GENRES } from '../../../lib/constants';
import { FileText, Star, DollarSign, Edit } from 'lucide-react';

interface MarketplaceScriptCardProps {
  script: MarketplaceScript;
  authorName: string;
}

export function MarketplaceScriptCard({ script, authorName }: MarketplaceScriptCardProps) {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(script.price || 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              to={`/scripts/marketplace/${script.id}`}
              className="text-xl font-semibold text-gray-900 hover:text-green-600"
            >
              {script.title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              by {authorName}
            </p>
          </div>
          {typeof script.rating === 'number' && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">
                {script.rating.toFixed(1)}
              </span>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
          )}
        </div>

        <p className="mt-3 text-gray-600">{script.logline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {script.genres.map((genreId) => {
            const genre = SCRIPT_GENRES.find(g => g.id === genreId);
            return (
              <span
                key={genreId}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {genre?.label}
              </span>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              {script.pageCount} pages
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {formattedPrice} ₽
            </div>
            {script.isEditingAllowed && (
              <div className="flex items-center text-green-600">
                <Edit className="h-4 w-4 mr-1" />
                Editing allowed
              </div>
            )}
          </div>
          
          <Link
            to={`/scripts/marketplace/${script.id}`}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}