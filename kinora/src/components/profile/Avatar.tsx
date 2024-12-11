import React from 'react';
import { cn } from '../../lib/utils';
import { UserCircle2 } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt, className, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  if (!src) {
    return (
      <div className={cn('rounded-full bg-gray-100 flex items-center justify-center', sizeClasses[size], className)}>
        <UserCircle2 className={cn('text-gray-400', size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12')} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'User avatar'}
      className={cn('rounded-full object-cover', sizeClasses[size], className)}
    />
  );
}