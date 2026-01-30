import React from 'react';
import LazyImage from './LazyImage';

export default function ThemeStrip({ theme }) {
  if (!theme) return null;

  // Get theme image URL - check multiple possible field names
  const getThemeImageUrl = () => {
    const imageUrl = theme.imageUrl || theme.image_url || theme.image || theme.img || theme.url;
    
    if (!imageUrl || imageUrl.trim() === '') {
      return null;
    }
    
    const trimmedUrl = imageUrl.trim();
    
    // If it's already a full URL, use it as is
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }
    
    // If it starts with /, it's a relative path from public folder
    if (trimmedUrl.startsWith('/')) {
      return trimmedUrl;
    }
    
    // Otherwise, assume it's a relative path and prepend /
    return `/${trimmedUrl}`;
  };

  const themeImageUrl = getThemeImageUrl();
  const themeName = theme.name || 'Theme';

  return (
    <div className="w-full flex justify-center px-4 sm:px-5 md:px-6 -mt-8 sm:-mt-10 md:-mt-12 relative z-10">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg flex items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 max-w-4xl w-full">
        {/* Theme Image */}
        {themeImageUrl && (
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gray-200">
            <LazyImage
              src={themeImageUrl}
              alt={themeName}
              className="w-full h-full object-cover object-center"
              skeletonClassName="w-full h-full rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Theme Name */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 capitalize flex-1">
          {themeName}
        </h2>
      </div>
    </div>
  );
}






