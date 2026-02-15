'use client';

import { useState } from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LOGO_PATH = '/logo.png';

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-9 h-9 md:w-10 md:h-10',
    medium: 'w-14 h-14 sm:w-16 sm:h-16',
    large: 'w-16 h-16 md:w-20 md:h-20',
  };

  const textSizeClasses = {
    small: 'text-base md:text-lg',
    medium: 'text-xl sm:text-2xl',
    large: 'text-2xl md:text-3xl',
  };

  const handleError = () => setImageError(true);

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-black flex items-center justify-center shadow-lg ${className}`}>
        <span className={`text-white font-bold ${textSizeClasses[size]}`}>J</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden shadow-2xl ring-2 ring-white/20 bg-gray-800 ${className}`}>
      <img 
        src={LOGO_PATH} 
        alt="Joseph's Dancing Highlights Logo" 
        className="w-full h-full object-cover"
        onError={handleError}
        style={{ display: 'block' }}
      />
    </div>
  );
}
