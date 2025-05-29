import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import products, { Product } from './data/products';


dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (_req: Request, res: Response) => {
  res.send('API is working...');
});

app.get('/api/products', (_req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  res.json(product);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
