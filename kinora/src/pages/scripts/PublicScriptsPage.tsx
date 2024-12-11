import React, { useState } from 'react';
import { PublicScript, ScriptGenre, ScriptType } from '../../lib/types';
import { ScriptFilters } from '../../components/scripts/ScriptFilters';
import { ScriptList } from '../../components/scripts/ScriptList';
import { Book } from 'lucide-react';

// Temporary mock data
const mockScripts: PublicScript[] = [
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
];

export function PublicScriptsPage() {
  const [search, setSearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<ScriptGenre[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ScriptType[]>([]);

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

    return matchesSearch && matchesGenres && matchesTypes;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Book className="h-8 w-8 text-green-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Public Scripts</h1>
      </div>

      <ScriptFilters
        search={search}
        onSearchChange={setSearch}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
        selectedTypes={selectedTypes}
        onTypeChange={handleTypeChange}
      />

      <div className="mt-8">
        <ScriptList scripts={filteredScripts} />
      </div>
    </div>
  );
}