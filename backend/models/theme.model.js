const mongoose = require('mongoose');
const schema = mongoose.schema;

const themeSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true, 
      trim: true
    },
    description: {
      type: String,
      required: false
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