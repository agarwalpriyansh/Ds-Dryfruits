import { Link } from 'react-router-dom';
import { slugifyThemeName } from '../utils/slugify';

export default function ThemeCard({ theme }) {
  if (!theme) return null;

  // Simple placeholder image as data URI (SVG)
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

  // Handle image URL - check multiple possible field names
  const getImageUrl = () => {
    // Try different possible field names
    const imageUrl = theme.imageUrl || theme.image_url || theme.image || theme.img || theme.url;
    
    // Debug: Log the full theme object to see what fields exist
    console.log('Theme object:', theme);
    console.log('Image URL found:', imageUrl);
    
    if (!imageUrl || imageUrl.trim() === '') {
      console.warn('No imageUrl found for theme:', theme.name, 'Available fields:', Object.keys(theme));
      return placeholderImage;
    }
    
    const trimmedUrl = imageUrl.trim();
    
    // If it's already a full URL, use it as is
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      console.log('Using full URL:', trimmedUrl);
      return trimmedUrl;
    }
    
    // If it starts with /, it's a relative path from public folder
    if (trimmedUrl.startsWith('/')) {
      console.log('Using relative path:', trimmedUrl);
      return trimmedUrl;
    }
    
    // Otherwise, assume it's a relative path and prepend /
    const finalUrl = `/${trimmedUrl}`;
    console.log('Using constructed path:', finalUrl);
    return finalUrl;
  };

  const imageUrl = getImageUrl();

  const themeSlug = slugifyThemeName(theme.name);

  return (
    <Link
      to={`/themes/${themeSlug}`}
      state={{ theme }}
      className="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out rounded-xl border border-gray-400 bg-white shadow-sm hover:shadow-md"
    >
      <div className="w-[88%] mt-6 aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={theme.name || 'Theme image'}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            console.error('❌ Image failed to load:', {
              attemptedUrl: imageUrl,
              themeName: theme.name,
              themeId: theme._id,
              currentSrc: e.target.src,
              error: e.target.error
            });
            // Use data URI placeholder as fallback
            if (e.target.src !== placeholderImage) {
              e.target.src = placeholderImage;
            }
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully:', {
              url: imageUrl,
              themeName: theme.name
            });
          }}
        />
      </div>
      <div className="pt-6 pb-8 w-full text-center">
        <h3 className="m-0 text-lg sm:text-xl font-semibold tracking-wide text-gray-900">
          {theme.name}
        </h3>
      </div>
    </Link>
  );
}

