const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: [
    "https://dsdryfruits.in",
    "https://www.dsdryfruits.in"
  ],
  credentials: true
}));
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const themesRouter = require('./routes/theme');
const productsRouter = require('./routes/product');
const contactRouter = require('./routes/contact');

app.use('/api/themes', themesRouter);
app.use('/api/products', productsRouter);
app.use('/api/contact', contactRouter);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});