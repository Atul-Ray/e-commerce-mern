import express from 'express';
import dotenv from 'dotenv';
import authRoutes  from './routes/auth.route.js';
import productRoutes  from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticRoutes from './routes/analytic.route.js';
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
const app= express();
const PORT=process.env.PORT;
console.log(PORT);

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true               // allow cookies/auth headers
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth' , authRoutes);
app.use('/api/products' , productRoutes);
app.use('/api/cart' , cartRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/analytics',analyticRoutes)



app.listen(PORT , ()=>{
    console.log('server is running on port');
    connectDB();
})