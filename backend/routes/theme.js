const router = require('express').Router();
let Theme = require('../models/theme.model'); // We import the Theme model
const { verifyToken, requireRole } = require('../middleware/auth');

// Get all themes
router.route('/').get((req, res) => {
  Theme.find()
    .then((themes) => res.json(themes))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Create a new theme (admin use)
router.route('/').post(verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { name, imageUrl, bannerUrl } = req.body;

    if (!name || !bannerUrl) {
      return res.status(400).json('Error: name and bannerUrl are required');
    }

    const existingTheme = await Theme.findOne({ name: name.trim() });
    if (existingTheme) {
      return res.status(400).json('Error: Theme with this name already exists');
    }

    const theme = new Theme({
      name: name.trim(),
      imageUrl: imageUrl || '',
      bannerUrl,
    });

    const saved = await theme.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating theme:', err);
    res.status(400).json('Error: ' + err.message);
  }
});

module.exports = router;