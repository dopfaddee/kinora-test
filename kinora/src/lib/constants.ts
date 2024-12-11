import { ScriptGenre, ScriptType } from './types';

export const SCRIPT_GENRES: { id: ScriptGenre; label: string }[] = [
  { id: 'drama', label: 'Drama' },
  { id: 'comedy', label: 'Comedy' },
  { id: 'thriller', label: 'Thriller' },
  { id: 'horror', label: 'Horror' },
  { id: 'action', label: 'Action' },
  { id: 'romance', label: 'Romance' },
  { id: 'scifi', label: 'Sci-Fi' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'documentary', label: 'Documentary' },
  { id: 'animation', label: 'Animation' },
];

export const SCRIPT_TYPES: { id: ScriptType; label: string; description: string }[] = [
  { 
    id: 'feature',
    label: 'Feature Film',
    description: 'Full-length movie script (90-120 pages)',
  },
  { 
    id: 'short',
    label: 'Short Film',
    description: 'Short film script (5-40 pages)',
  },
  { 
    id: 'pilot',
    label: 'TV Pilot',
    description: 'First episode of a TV series',
  },
  { 
    id: 'series',
    label: 'TV Series',
    description: 'Complete season of a TV series',
  },
];

export const RATING_SCALE = [
  { value: 1, label: 'Poor' },
  { value: 2, label: 'Below Average' },
  { value: 3, label: 'Average' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Excellent' },
];