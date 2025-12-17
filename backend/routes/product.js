const router = require('express').Router();
let Product = require('../models/product.model');
const { verifyToken, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

// IMPORTANT: Define /featured route FIRST before any parameterized routes
router.get('/featured', (req, res) => {
  Product.find({ isFeatured: true })
    .then((products) => {
      if (!products || products.length === 0) {
        return res.json([]);
      }

      const productSummaries = products.map((product) => ({
        _id: product._id,
        name: product.name,
        shortDescription: product.shortDescription,
        imageUrl: product.imageUrl,
        variants: product.variants, // include all variants for dropdown pricing
        defaultPrice:
          product.variants && product.variants.length > 0
            ? product.variants[0]
            : { weight: 'N/A', price: 0 },
      }));
      res.json(productSummaries);
    })
    .catch((err) => {
      console.error('Error in featured products route:', err);
      res.status(400).json('Error: ' + err);
    });
});

// Get all products (admin use)
router.get('/', verifyToken, requireRole('admin'), (req, res) => {
  Product.find()
    .populate('theme')
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/by-theme/:themeId').get((req, res) => {
  Product.find({ theme: req.params.themeId })
    .then((products) => {
      if (!products || products.length === 0) {
        return res.json([]);
      }

      const productSummaries = products.map((product) => ({
        _id: product._id,
        name: product.name,
        shortDescription: product.shortDescription,
        imageUrl: product.imageUrl,
        variants: product.variants, // include all variants for dropdown pricing
        defaultPrice:
          product.variants && product.variants.length > 0
            ? product.variants[0]
            : { weight: 'N/A', price: 0 },
      }));
      res.json(productSummaries);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Create a new product (admin use)
router.post(
  '/',
  verifyToken,
  requireRole('admin'),
  upload.single('image'),
  async (req, res) => {
    try {
      const {
        name,
        fullDescription,
        shortDescription,
        benefits,
        imageUrl,
        variants,
        theme,
        isFeatured,
      } = req.body;

      if (!name || !fullDescription || !shortDescription || !benefits || !theme) {
        return res
          .status(400)
          .json('Error: name, fullDescription, shortDescription, benefits and theme are required');
      }

      // Parse variants if it's a string (from FormData)
      let parsedVariants = variants;
      if (typeof variants === 'string') {
        try {
          parsedVariants = JSON.parse(variants);
        } catch (e) {
          return res.status(400).json('Error: Invalid variants format');
        }
      }

      if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
        return res
          .status(400)
          .json('Error: at least one price variant is required');
      }

      let finalImageUrl = imageUrl || '';

      // Upload image file if provided
      if (req.file) {
        try {
          const imageResult = await uploadToCloudinary(
            req.file.buffer,
            'home/Ds/products',
            `product-${name.trim().toLowerCase().replace(/\s+/g, '-')}-image`
          );
          finalImageUrl = imageResult.secure_url;
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          return res.status(400).json('Error: Failed to upload image file');
        }
      }

      const product = new Product({
        name: name.trim(),
        fullDescription,
        shortDescription,
        benefits,
        imageUrl: finalImageUrl,
        variants: parsedVariants,
        theme,
        isFeatured: !!isFeatured,
      });

      const saved = await product.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(400).json('Error: ' + err.message);
    }
  }
);

// Update existing product (admin use)
router.put(
  '/:id',
  verifyToken,
  requireRole('admin'),
  upload.single('image'),
  async (req, res) => {
    try {
      const {
        name,
        fullDescription,
        shortDescription,
        benefits,
        imageUrl,
        variants,
        theme,
        isFeatured,
      } = req.body;

      // Get existing product first
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json('Error: Product not found');
      }

      // Parse variants if it's a string (from FormData)
      let parsedVariants = variants;
      if (typeof variants === 'string') {
        try {
          parsedVariants = JSON.parse(variants);
        } catch (e) {
          return res.status(400).json('Error: Invalid variants format');
        }
      }

      // Build update object
      const updates = {};
      if (name) updates.name = name.trim();
      if (fullDescription !== undefined) updates.fullDescription = fullDescription;
      if (shortDescription !== undefined) updates.shortDescription = shortDescription;
      if (benefits !== undefined) updates.benefits = benefits;
      if (theme !== undefined) updates.theme = theme;
      if (isFeatured !== undefined) updates.isFeatured = !!isFeatured;
      if (parsedVariants && Array.isArray(parsedVariants) && parsedVariants.length > 0) {
        updates.variants = parsedVariants;
      }

      // Handle image upload
      if (req.file) {
        try {
          const imageResult = await uploadToCloudinary(
            req.file.buffer,
            'home/Ds/products',
            `product-${(name || existingProduct.name).trim().toLowerCase().replace(/\s+/g, '-')}-image`
          );
          updates.imageUrl = imageResult.secure_url;
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          return res.status(400).json('Error: Failed to upload image file');
        }
      } else if (imageUrl !== undefined) {
        // If imageUrl is provided and no file uploaded, use the URL
        updates.imageUrl = imageUrl;
      }
      // If neither file nor URL is provided, keep existing imageUrl

      const product = await Product.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      });

      res.json(product);
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(400).json('Error: ' + err.message);
    }
  }
);

router.route('/:id').get((req, res) => {
  // Skip if the id is "featured" - this should never happen if routes are in correct order
  if (req.params.id === 'featured') {
    console.warn('Warning: /:id route matched "featured" - route order issue!');
    return res.status(404).json('Error: Route not found');
  }

  Product.findById(req.params.id)
    .populate('theme')
    .then((product) => {
      if (!product) {
        return res.status(404).json('Error: Product not found');
      }

      res.json(product);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;