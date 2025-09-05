import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../lib/axios';




const defaultProducts = [
  {
    name: "Modern Apartment in City Center",
    description: "A spacious 3-bedroom apartment with panoramic views of the skyline.",
    price: 750000,
    image: "https://example.com/images/apartment-city-center.jpg",
    category: "estate",
    isFeatured: true
  },
  {
    name: "Cozy Cottage in the Suburbs",
    description: "Perfect for small families, this 2-bedroom cottage offers a peaceful escape.",
    price: 320000,
    image: "https://example.com/images/cottage-suburbs.jpg",
    category: "estate",
    isFeatured: false
  },
  {
    name: "Luxury Villa with Ocean View",
    description: "An exclusive villa with 5 bedrooms, private pool, and beach access.",
    price: 2250000,
    image: "https://example.com/images/luxury-villa.jpg",
    category: "estate",
    isFeatured: true
  }
];


export const getAllProducts = createAsyncThunk('product/getAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/products')
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  })

export const getFeaturedProduct = createAsyncThunk('product/getFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/products/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch featured products");
    }
  }
)

export const getProductByCategory = createAsyncThunk('product/getProductByCategory',
  async (category ,{rejectWithValue})=>{
    try {
      const response = await axiosInstance.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'failed to fetch product by category')
    }
  }
)

const initialState = {
  products: [],
  featured: defaultProducts,
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
      addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getFeaturedProduct.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(getProductByCategory.fulfilled,(state ,action)=>{
        state.featured=action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => { state.loading = true }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state) => {
          state.loading = false;
        }
      )

  }
});

export default productSlice.reducer;


