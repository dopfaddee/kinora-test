import React from 'react';
import { ScriptGenre, ScriptType } from '../../lib/types';
import { SCRIPT_GENRES, SCRIPT_TYPES } from '../../lib/constants';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface ScriptFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedGenres: ScriptGenre[];
  onGenreChange: (genre: ScriptGenre) => void;
  selectedTypes: ScriptType[];
  onTypeChange: (type: ScriptType) => void;
  showPriceFilter?: boolean;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
}

export function ScriptFilters({
  search,
  onSearchChange,
  selectedGenres,
  onGenreChange,
  selectedTypes,
  onTypeChange,
  showPriceFilter,
  priceRange,
  onPriceRangeChange,
}: ScriptFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search scripts..."
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
        {SCRIPT_GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0
              ${selectedGenres.includes(genre.id)
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {genre.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <SlidersHorizontal className="h-5 w-5 text-gray-400 flex-shrink-0" />
        {SCRIPT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0
              ${selectedTypes.includes(type.id)
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            title={type.description}
          >
            {type.label}
          </button>
        ))}
      </div>

      {showPriceFilter && priceRange && onPriceRangeChange && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Price Range (₽):</span>
          <input
            type="number"
            min={0}
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
            className="w-24 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          <span>-</span>
          <input
            type="number"
            min={0}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-24 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      )}
    </div>
  );
}