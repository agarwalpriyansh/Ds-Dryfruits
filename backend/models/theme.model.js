const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true, 
      trim: true
    },
    imageUrl: {
      type: String, 
      required: false
    }
  }, {
    timestamps: true,
  });
  
  const Theme = mongoose.model('Theme', themeSchema);
  
  module.exports = Theme;