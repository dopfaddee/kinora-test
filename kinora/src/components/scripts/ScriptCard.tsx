import React from 'react';
import { Link } from 'react-router-dom';
import { Script } from '../../lib/types';
import { SCRIPT_GENRES } from '../../lib/constants';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Star, Clock } from 'lucide-react';

interface ScriptCardProps {
  script: Script;
  authorName: string;
}

export function ScriptCard({ script, authorName }: ScriptCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              to={`/scripts/${script.id}`}
              className="text-xl font-semibold text-gray-900 hover:text-green-600"
            >
              {script.title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              by {authorName} • {formatDistanceToNow(script.createdAt, { addSuffix: true })}
            </p>
          </div>
          {script.isVerified && (
            <Star className="h-5 w-5 text-yellow-400" />
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

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            {script.pageCount} pages
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {script.type}
          </div>
        </div>
      </div>
    </div>
  );
}