const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {string} folder - The folder name in Cloudinary (optional)
 * @param {string} publicId - Custom public ID for the file (optional)
 * @returns {Promise<Object>} - Cloudinary upload result with secure_url
 */
const uploadToCloudinary = (fileBuffer, folder = 'uploads', publicId = null) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: folder,
      resource_type: 'auto', // Automatically detect image, video, etc.
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    // Convert buffer to stream using streamifier (more compatible)
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = { uploadToCloudinary };

