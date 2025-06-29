import express from 'express';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Add this import
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import shippingRoutes from './routes/shippingRoutes';

dotenv.config();

const port = Number(process.env.PORT) || 5001;
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000',
  'https://gjvvhm5d-3000.usw3.devtunnels.ms',
  ],
  credentials: true,
}));


app.use(cookieParser()); // Add cookie-parser middleware


app.use((req, res, next) => {
  if (req.headers['content-type'] === 'text/plain') {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        req.body = JSON.parse(data);
        next();
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else {
    express.json()(req, res, next); // Normal JSON handling
  }
});


// Routes
app.get('/', (_req, res) => {
  res.send('API is working...');
});

// Product routes
app.use('/api/products', productRoutes);

// User routes
app.use('/api/users', userRoutes);

// Order routes
app.use('/api/orders', orderRoutes)

// Shipping routes
app.use('/api/shipping', shippingRoutes);

// Payment routes
app.use('/api/payment', paymentRoutes);


// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});