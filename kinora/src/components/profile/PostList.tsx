import React from 'react';
import { Post } from '../../lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from './Avatar';

interface PostListProps {
  posts: Post[];
  userAvatar?: string;
  userName: string;
}

export function PostList({ posts, userAvatar, userName }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg p-6">
          <div className="flex items-start">
            <Avatar src={userAvatar} size="sm" />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{userName}</h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </p>
              </div>
              <p className="mt-2 text-gray-600 whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}