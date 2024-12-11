import React from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { CreatePost } from '../../components/profile/CreatePost';
import { PostList } from '../../components/profile/PostList';
import { UserProfile, Post } from '../../lib/types';

// Temporary mock data
const mockProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'screenwriter',
  bio: 'Passionate screenwriter with a focus on drama and thriller genres.',
  telegramLink: 'https://t.me/johndoe',
  kinopoiskLink: 'https://www.kinopoisk.ru/user/123456/',
  portfolio: 'https://portfolio.johndoe.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just finished my latest screenplay! Looking forward to feedback.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function ProfilePage() {
  const { userId } = useParams();
  const isOwnProfile = userId === mockProfile.id;

  const handleCreatePost = async (data: { content: string }) => {
    // TODO: Implement post creation
    console.log('Creating post:', data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader profile={mockProfile} isOwnProfile={isOwnProfile} />
      
      <div className="mt-8 space-y-6">
        {isOwnProfile && (
          <CreatePost
            userAvatar={mockProfile.avatar}
            onSubmit={handleCreatePost}
          />
        )}
        <PostList
          posts={mockPosts}
          userAvatar={mockProfile.avatar}
          userName={mockProfile.name}
        />
      </div>
    </div>
  );
}