import { CartItem, CartState } from '../slices/cartSlice';

export const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: CartState): CartState => {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate shipping price (free over 100)
  state.shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);

  // Calculate tax (16%)
  state.taxPrice = addDecimals(Number((0.16 * Number(state.itemsPrice)).toFixed(2)));

  // Calculate total
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state));
  }

  return state;
};
