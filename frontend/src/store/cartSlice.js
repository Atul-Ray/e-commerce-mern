import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

// Async thunks
export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/cart');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch cart');
    return rejectWithValue([]);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (product, { rejectWithValue }) => {
  try {
    await axios.post('/cart', { productId: product._id });
    toast.success('Product added to cart');
    return product;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add to cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
  await axios.delete('/cart', { data: { productId } });
  return productId;
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }, { dispatch }) => {
  if (quantity === 0) {
    await dispatch(removeFromCart(productId));
    return;
  }
  await axios.put(`/cart/${productId}`, { quantity });
  return { productId, quantity };
});

// Initial state
const initialState = {
  cart: [],
  total: 0,
  subtotal: 0,
};

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = [];
      state.total = 0;
      state.subtotal = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload;
        calculateTotals(state);
      })
      .addCase(getCartItems.rejected, (state) => {
        state.cart = [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const product = action.payload;
        const existingItem = state.cart.find((item) => item._id === product._id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cart.push({ ...product, quantity: 1 });
        }
        calculateTotals(state);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item._id !== action.payload);
        calculateTotals(state);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { productId, quantity } = action.payload;
        const item = state.cart.find((item) => item._id === productId);
        if (item) item.quantity = quantity;
        calculateTotals(state);
      });
  },
});

// Helper function
function calculateTotals(state) {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  state.subtotal = subtotal;
  state.total = subtotal; // No coupon discount applied
}

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
