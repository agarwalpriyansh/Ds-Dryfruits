const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceVariantSchema = new Schema({
  weight: {
    type: String, 
    required: true,
  },
  price: {
    type: Number, 
  },
}, { _id: false });


const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  // The "whole description" for the "Read More" page
  fullDescription: {
    type: String,
    required: true
  },

  // The "few details" for the theme/category page
  shortDescription: {
    type: String,
    required: true
  },

  benefits: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: false
  },

  variants: {
    type: [priceVariantSchema],
    required: true,
    // Validation to ensure the variants array is not empty
    validate: [
      (val) => val.length > 0,
      'Product must have at least one price variant.'
    ]
  },

  // This is the link to the parent Theme model
  theme: {
    type: mongoose.Schema.Types.ObjectId, // Stores the Theme's unique _id
    ref: 'Theme',                          // Tells Mongoose this ID refers to the 'Theme' model
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;