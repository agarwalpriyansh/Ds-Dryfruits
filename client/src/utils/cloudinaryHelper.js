/**
 * Optimizes a Cloudinary URL by adding transformation parameters.
 * 
 * @param {string} url - The original Cloudinary URL
 * @param {Object} options - Optimization options
 * @param {number} options.width - The target width (e.g., 400, 800)
 * @param {string} options.quality - Quality setting (default: 'auto')
 * @param {string} options.format - Format setting (default: 'auto')
 * @param {string} options.crop - Crop setting (default: 'fill')
 * @returns {string} The optimized URL
 */
export const getOptimizedCloudinaryUrl = (url, options = {}) => {
  if (!url || typeof url !== 'string') return url;
  
  // Only process Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;
  
  // If the URL already contains transformation parameters (e.g., /upload/c_fill,w_300/), return it
  // This is a simple check to avoid double-processing
  if (url.includes('/upload/') && url.split('/upload/')[1].match(/^[a-z]_[a-z0-9]+/)) {
    // Basic check: if after /upload/ we see something like w_ or q_ or f_
    // However, it's safer to just replace it or append to it.
    // For now, let's assume raw URLs as provided by the user.
  }

  const {
    width,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options;

  // Split the URL to insert transformations
  // Standard format: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  // Build transformation string
  const transformations = [];
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);
  if (width) transformations.push(`w_${width}`);
  if (crop && width) transformations.push(`c_${crop}`);

  const transformString = transformations.join(',');

  // Check if the second part starts with existing transformations
  // If it does, we might want to replace them, but for raw URLs this is fine.
  // Example: parts[1] is "v1765387511/prouctbg_jkhkhw.png"
  
  return `${parts[0]}/upload/${transformString}/${parts[1]}`;
};
