import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Import cors

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// ✅ Enable CORS for frontend at port 3000
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.send('API is working...');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  res.json(product);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
