import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar } from './Avatar';

const postSchema = z.object({
  content: z.string().min(1, 'Post cannot be empty').max(1000, 'Post is too long'),
});

type PostFormData = z.infer<typeof postSchema>;

interface CreatePostProps {
  userAvatar?: string;
  onSubmit: (data: PostFormData) => Promise<void>;
}

export function CreatePost({ userAvatar, onSubmit }: CreatePostProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const handlePostSubmit = async (data: PostFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePostSubmit)} className="bg-white shadow rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <Avatar src={userAvatar} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="border-b border-gray-200 focus-within:border-green-600">
            <textarea
              rows={3}
              {...register('content')}
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What's on your mind?"
            />
          </div>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}