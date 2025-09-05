import React from 'react';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getFeaturedProduct } from '../store/productSlice';
import toast from 'react-hot-toast';


function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.featured);
  const user=useSelector(state=>state.auth.user);

  const handleAddToCart = (product) => {
    if(!user) {
      toast.error("please login");
      return
    }
    console.log("Added to cart:", product);
    dispatch(addToCart(product));
  };


  useEffect(() => {
    dispatch(getFeaturedProduct());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
}

export default ProductList;
