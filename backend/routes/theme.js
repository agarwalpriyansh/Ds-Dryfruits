const router = require('express').Router();
let Theme = require('../models/theme.model'); // We import the Theme model
const { verifyToken, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

// Get all themes
router.route('/').get((req, res) => {
  Theme.find()
    .then((themes) => res.json(themes))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Create a new theme (admin use)
router.route('/').post(
  verifyToken,
  requireRole('admin'),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, imageUrl, bannerUrl } = req.body;

      if (!name) {
        return res.status(400).json('Error: name is required');
      }

      const existingTheme = await Theme.findOne({ name: name.trim() });
      if (existingTheme) {
        return res.status(400).json('Error: Theme with this name already exists');
      }

      let finalImageUrl = imageUrl || '';
      let finalBannerUrl = bannerUrl || '';

      // Upload image file if provided
      if (req.files && req.files.image && req.files.image[0]) {
        try {
          const imageResult = await uploadToCloudinary(
            req.files.image[0].buffer,
            'home/Ds/themes',
            `theme-${name.trim().toLowerCase().replace(/\s+/g, '-')}-image`
          );
          finalImageUrl = imageResult.secure_url;
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          return res.status(400).json('Error: Failed to upload image file');
        }
      }

      // Upload banner file if provided
      if (req.files && req.files.banner && req.files.banner[0]) {
        try {
          const bannerResult = await uploadToCloudinary(
            req.files.banner[0].buffer,
            'home/Ds/themes',
            `theme-${name.trim().toLowerCase().replace(/\s+/g, '-')}-banner`
          );
          finalBannerUrl = bannerResult.secure_url;
        } catch (uploadError) {
          console.error('Error uploading banner:', uploadError);
          return res.status(400).json('Error: Failed to upload banner file');
        }
      }

      // Banner URL is required (either from file upload or provided URL)
      if (!finalBannerUrl) {
        return res.status(400).json('Error: bannerUrl is required (upload file or provide URL)');
      }

      const theme = new Theme({
        name: name.trim(),
        imageUrl: finalImageUrl,
        bannerUrl: finalBannerUrl,
      });

      const saved = await theme.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error creating theme:', err);
      res.status(400).json('Error: ' + err.message);
    }
  }
);

module.exports = router;