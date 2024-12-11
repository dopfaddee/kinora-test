import React, { useState } from 'react';
import { PublicScript, MarketplaceScript, ScriptGenre, ScriptType } from '../../lib/types';
import { ScriptList } from '../../components/scripts/ScriptList';
import { ScriptFilters } from '../../components/scripts/ScriptFilters';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

// Temporary mock data
const mockScripts: (PublicScript | MarketplaceScript)[] = [
  {
    id: '1',
    scriptType: 'public',
    title: 'The Last Sunset',
    logline: 'A dying photographer embarks on a final journey to capture the world\'s most beautiful sunsets, discovering the true meaning of life along the way.',
    genres: ['drama', 'romance'],
    type: 'feature',
    pageCount: 110,
    language: 'ru',
    kinopoiskId: 'tt1234567',
    kinopoiskRating: 8.4,
    releaseYear: 2023,
    director: 'Anna Petrova',
    writer: 'Ivan Ivanov',
    pdfUrl: '/scripts/the-last-sunset.pdf',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
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

export function ScriptsPage() {
  const [search, setSearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<ScriptGenre[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ScriptType[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

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

    const matchesPrice = script.scriptType === 'public' || (
      script.scriptType === 'marketplace' &&
      script.price >= priceRange[0] &&
      script.price <= priceRange[1]
    );

    return matchesSearch && matchesGenres && matchesTypes && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scripts</h1>
        <Link
          to="/scripts/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Script
        </Link>
      </div>

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
    </div>
  );
}