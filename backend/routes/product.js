const router = require('express').Router();
let Product = require('../models/product.model'); 

// IMPORTANT: Define /featured route FIRST before any parameterized routes
router.get('/featured', (req, res) => {
  Product.find({ isFeatured: true })
    .then(products => {
      if (!products || products.length === 0) {
        return res.json([]); 
      }

      const productSummaries = products.map(product => ({
        _id: product._id,
        name: product.name,
        shortDescription: product.shortDescription,
        imageUrl: product.imageUrl,
        variants: product.variants, // include all variants for dropdown pricing
        defaultPrice: (product.variants && product.variants.length > 0)
          ? product.variants[0]
          : { weight: 'N/A', price: 0 }
      }));
      res.json(productSummaries);
    })
    .catch(err => {
      console.error('Error in featured products route:', err);
      res.status(400).json('Error: ' + err);
    });
});

router.route('/by-theme/:themeId').get((req, res) => {

  Product.find({ theme: req.params.themeId })
    .then(products => {
      if (!products || products.length === 0) {
        return res.json([]); 
      }

      const productSummaries = products.map(product => ({
        _id: product._id,
        name: product.name,
        shortDescription: product.shortDescription,
        imageUrl: product.imageUrl,
        variants: product.variants, // include all variants for dropdown pricing
        defaultPrice: (product.variants && product.variants.length > 0)
          ? product.variants[0]
          : { weight: 'N/A', price: 0 }
      }));
      res.json(productSummaries);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  // Skip if the id is "featured" - this should never happen if routes are in correct order
  if (req.params.id === 'featured') {
    console.warn('Warning: /:id route matched "featured" - route order issue!');
    return res.status(404).json('Error: Route not found');
  }
  
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json('Error: Product not found');
      }
      
      res.json(product);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;