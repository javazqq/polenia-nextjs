export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  countInStock: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Eco-Friendly Water Bottle',
    price: 19.99,
    description: 'Stay hydrated with this BPA-free reusable bottle.',
    image: '/images/placeholder-image.jpg',
    countInStock: 50,
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Comfortable and sustainable everyday wear.',
    image: '/images/placeholder-image.jpg',
    countInStock: 30,
  },
  {
    id: 3,
    name: 'Bamboo Toothbrush (Pack of 3)',
    price: 9.99,
    description: 'A biodegradable alternative to plastic brushes.',
    image: '/images/placeholder-image.jpg',
    countInStock: 40,
  },
];

export default products;
