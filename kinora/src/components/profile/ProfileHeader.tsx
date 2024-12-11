import React from 'react';
import { Avatar } from './Avatar';
import { UserProfile } from '../../lib/types';
import { Link } from 'react-router-dom';
import { MessageCircle, Film, Briefcase } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-green-400 to-green-600" />
      <div className="px-6 py-4">
        <div className="flex items-start -mt-12">
          <Avatar src={profile.avatar} size="lg" className="ring-4 ring-white" />
          <div className="ml-4 mt-10 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              {isOwnProfile && (
                <Link
                  to="/settings/profile"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit Profile
                </Link>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500 capitalize">{profile.role}</p>
          </div>
        </div>

        {profile.bio && (
          <p className="mt-4 text-gray-600">{profile.bio}</p>
        )}

        <div className="mt-4 flex items-center space-x-4">
          {profile.telegramLink && (
            <a
              href={profile.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <MessageCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">Telegram</span>
            </a>
          )}
          {profile.kinopoiskLink && (
            <a
              href={profile.kinopoiskLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Film className="h-5 w-5 mr-1" />
              <span className="text-sm">KinoPoisk</span>
            </a>
          )}
          {profile.portfolio && (
            <a
              href={profile.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Briefcase className="h-5 w-5 mr-1" />
              <span className="text-sm">Portfolio</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}