import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
  res.send('API is working...');
});

// Product routes
app.use('/api/products', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});