import React from 'react';
import { PublicScript, MarketplaceScript } from '../../lib/types';
import { PublicScriptCard } from './public/PublicScriptCard';
import { MarketplaceScriptCard } from './marketplace/MarketplaceScriptCard';

interface ScriptListProps {
  scripts: (PublicScript | MarketplaceScript)[];
  getAuthorName?: (authorId: string) => string;
}

export function ScriptList({ scripts, getAuthorName }: ScriptListProps) {
  if (scripts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No scripts found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {scripts.map((script) => (
        script.scriptType === 'public' ? (
          <PublicScriptCard key={script.id} script={script} />
        ) : (
          <MarketplaceScriptCard
            key={script.id}
            script={script}
            authorName={getAuthorName?.(script.authorId) || 'Unknown Author'}
          />
        )
      ))}
    </div>
  );
}