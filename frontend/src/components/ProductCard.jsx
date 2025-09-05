


const ProductCard = ({ id, name, price, image, onAddToCart }) => {
  // Now you can use `id` directly inside your component
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={name}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">Price: ₹{price}</p>
        <button
          onClick={() => onAddToCart({ id, name, price, image })}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;