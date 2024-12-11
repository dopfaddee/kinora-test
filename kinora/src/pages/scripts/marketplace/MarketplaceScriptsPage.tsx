import React, { useState } from 'react';
import { MarketplaceScript, ScriptGenre, ScriptType } from '../../../lib/types';
import { ScriptFilters } from '../../../components/scripts/ScriptFilters';
import { ScriptList } from '../../../components/scripts/ScriptList';
import { Link } from 'react-router-dom';
import { ShoppingBag, PlusCircle } from 'lucide-react';

// Temporary mock data
const mockScripts: MarketplaceScript[] = [
  {
    id: '2',
    scriptType: 'marketplace',
    title: 'Midnight in Moscow',
    logline: 'A young detective must solve a series of mysterious disappearances that only occur at midnight in the Moscow Metro.',
    genres: ['thriller', 'mystery'],
    type: 'feature',
    pageCount: 95,
    language: 'ru',
    authorId: '1',
    price: 150000,
    isEditingAllowed: true,
    status: 'published',
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockAuthors: Record<string, string> = {
  '1': 'Mikhail Smirnov',
};

export function MarketplaceScriptsPage() {
  const [search, setSearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<ScriptGenre[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ScriptType[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  // TODO: Get actual user role from auth context
  const userRole = 'producer';

  const handleGenreChange = (genre: ScriptGenre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleTypeChange = (type: ScriptType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredScripts = mockScripts.filter(script => {
    const matchesSearch = search === '' ||
      script.title.toLowerCase().includes(search.toLowerCase()) ||
      script.logline.toLowerCase().includes(search.toLowerCase());

    const matchesGenres = selectedGenres.length === 0 ||
      selectedGenres.some(genre => script.genres.includes(genre));

    const matchesTypes = selectedTypes.length === 0 ||
      selectedTypes.includes(script.type);

    const matchesPrice = script.price >= priceRange[0] && script.price <= priceRange[1];

    return matchesSearch && matchesGenres && matchesTypes && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <ShoppingBag className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Script Marketplace</h1>
        </div>
        {userRole === 'screenwriter' && (
          <Link
            to="/scripts/marketplace/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Submit Script
          </Link>
        )}
      </div>

      {userRole === 'producer' ? (
        <>
          <ScriptFilters
            search={search}
            onSearchChange={setSearch}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
            selectedTypes={selectedTypes}
            onTypeChange={handleTypeChange}
            showPriceFilter={true}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />

          <div className="mt-8">
            <ScriptList
              scripts={filteredScripts}
              getAuthorName={(id) => mockAuthors[id] || 'Unknown Author'}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Submit Your Script to the Marketplace
          </h2>
          <p className="text-gray-600 mb-6">
            Share your work with producers and film companies.
          </p>
          <Link
            to="/scripts/marketplace/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Submit Script
          </Link>
        </div>
      )}
    </div>
  );
}