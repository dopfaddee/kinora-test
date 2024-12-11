import React from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer } from '../../../components/scripts/PDFViewer';
import { Star, FileText, Calendar } from 'lucide-react';
import { SCRIPT_GENRES } from '../../../lib/constants';

// Mock data
const mockScript = {
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
  pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function PublicScriptDetailPage() {
  const { id } = useParams();

  // TODO: Fetch script data based on id
  const script = mockScript;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{script.title}</h1>
              <p className="mt-2 text-lg text-gray-600">{script.logline}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {script.kinopoiskRating}
              </span>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Director</h3>
              <p className="mt-1 text-lg text-gray-900">{script.director}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Writer</h3>
              <p className="mt-1 text-lg text-gray-900">{script.writer}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Release Year</h3>
              <p className="mt-1 text-lg text-gray-900">{script.releaseYear}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Language</h3>
              <p className="mt-1 text-lg text-gray-900 uppercase">{script.language}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {script.genres.map((genreId) => {
              const genre = SCRIPT_GENRES.find(g => g.id === genreId);
              return (
                <span
                  key={genreId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {genre?.label}
                </span>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {script.pageCount} pages
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {script.type}
            </div>
          </div>
        </div>

        <div className="p-6">
          <PDFViewer url={script.pdfUrl} />
        </div>
      </div>
    </div>
  );
}