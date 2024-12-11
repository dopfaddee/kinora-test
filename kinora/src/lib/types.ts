// User related types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'screenwriter' | 'producer' | 'master' | 'company';
  avatar?: string;
  telegramLink?: string;
  kinopoiskLink?: string;
  portfolio?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Shared script types
export type ScriptType = 'feature' | 'short' | 'pilot' | 'series';
export type ScriptGenre = 
  | 'drama' | 'comedy' | 'thriller' | 'horror' 
  | 'action' | 'romance' | 'scifi' | 'fantasy' 
  | 'documentary' | 'animation';

// Base script interface
interface BaseScript {
  id: string;
  title: string;
  logline: string;
  genres: ScriptGenre[];
  type: ScriptType;
  pageCount: number;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

// Public script interface
export interface PublicScript extends BaseScript {
  scriptType: 'public';
  kinopoiskId: string;
  kinopoiskRating: number;
  releaseYear: number;
  director: string;
  writer: string;
  pdfUrl: string;
  isVerified: boolean;
}

// Marketplace script interface
export interface MarketplaceScript extends BaseScript {
  scriptType: 'marketplace';
  authorId: string;
  price: number;
  isEditingAllowed: boolean;
  status: 'draft' | 'published' | 'sold' | 'archived';
  rating?: number;
  feedback?: ScriptFeedback[];
  previewUrl?: string; // First few pages for preview
}

export interface ScriptFeedback {
  id: string;
  scriptId: string;
  userId: string;
  rating: number; // 1-10
  content: string;
  createdAt: Date;
}

export interface ScriptNegotiation {
  id: string;
  scriptId: string;
  producerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  proposedPrice?: number;
  message: string;
  requiresEditing: boolean;
  editingNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}