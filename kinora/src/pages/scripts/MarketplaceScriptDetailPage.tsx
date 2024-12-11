import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer } from '../../components/scripts/PDFViewer';
import { Star, FileText, DollarSign, MessageCircle, Edit } from 'lucide-react';
import { SCRIPT_GENRES } from '../../lib/constants';

// Mock data
const mockScript = {
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
  previewUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockAuthor = {
  name: 'Mikhail Smirnov',
  rating: 4.8,
  scriptsCount: 5,
};

export function MarketplaceScriptDetailPage() {
  const { id } = useParams();
  const [showNegotiationForm, setShowNegotiationForm] = useState(false);

  // TODO: Get actual user role from auth context
  const userRole = 'producer';

  // TODO: Fetch script data based on id
  const script = mockScript;

  const handlePurchase = () => {
    // TODO: Implement purchase logic
    console.log('Purchasing script:', id);
  };

  const handleNegotiate = (data: any) => {
    // TODO: Implement negotiation logic
    console.log('Negotiating script:', id, data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{script.title}</h1>
              <p className="mt-2 text-lg text-gray-600">{script.logline}</p>
            </div>
            {userRole === 'producer' && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNegotiationForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Negotiate
                </button>
                <button
                  onClick={handlePurchase}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Purchase
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Author</h3>
              <div className="mt-1">
                <p className="text-lg text-gray-900">{mockAuthor.name}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {mockAuthor.rating} • {mockAuthor.scriptsCount} scripts
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Price</h3>
              <p className="mt-1 text-lg text-gray-900">
                {new Intl.NumberFormat('ru-RU').format(script.price)} ₽
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Language</h3>
              <p className="mt-1 text-lg text-gray-900 uppercase">{script.language}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Editing</h3>
              <div className="mt-1 flex items-center">
                {script.isEditingAllowed ? (
                  <>
                    <Edit className="h-5 w-5 text-green-600" />
                    <span className="ml-2 text-green-600">Available</span>
                  </>
                ) : (
                  <span className="text-gray-600">Not available</span>
                )}
              </div>
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
              <Star className="h-5 w-5 mr-2" />
              {script.rating} rating
            </div>
          </div>
        </div>

        <div className="p-6">
          {userRole === 'producer' ? (
            <PDFViewer url={script.previewUrl} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              Preview is only available for producers
            </div>
          )}
        </div>
      </div>
    </div>
  );
}