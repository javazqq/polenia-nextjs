import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Add this import
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser()); // Add cookie-parser middleware
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
  res.send('API is working...');
});

// Product routes
app.use('/api/products', productRoutes);

// User routes
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});