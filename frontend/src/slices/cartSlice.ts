import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Types ---
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

// --- Utils ---
const updateCart = (state: CartState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state));
  }
  return state;
};

// --- Initial State ---
const initialState: CartState = typeof window !== 'undefined' && localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : {
      cartItems: [],
      shippingAddress: { address: '', city: '', postalCode: '', country: '' },
      paymentMethod: 'Paypal',
      itemsPrice: '0.00',
      shippingPrice: '0.00',
      taxPrice: '0.00',
      totalPrice: '0.00',
    };

// --- Slice ---
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === item.id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

// --- Exports ---
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
