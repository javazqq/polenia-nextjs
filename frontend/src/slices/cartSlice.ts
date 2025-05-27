import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Define the types for your state
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
}

// 2. Parse from localStorage and provide a fallback
const initialState: CartState = typeof window !== 'undefined' && localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : { cartItems: [] };

// 3. Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Example reducer (optional, add yours here)
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
  },
});

// 4. Export
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
