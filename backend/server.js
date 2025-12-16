const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dsdryfruits.in",
    "https://www.dsdryfruits.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Note: For multipart/form-data, we don't set Content-Type header manually
// Multer will handle it automatically

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const themesRouter = require('./routes/theme');
const productsRouter = require('./routes/product');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');

app.use('/api/themes', themesRouter);
app.use('/api/products', productsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});