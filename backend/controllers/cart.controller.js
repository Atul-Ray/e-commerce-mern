import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("error in addTocart controller");
    res.status(500).json({ message: "server error" });
  }
};

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({_id:{$in:req.user.cartItems}});

        const cartItems = products.map(product=>{
            const item = req.user.cartItems.find(cartItem=>cartItem.id===product.id);
            return {...product.toJSON(),quantity:item.quantity}
        })
        res.json(cartItems);
    } catch (error) {
        console.log('error in getCartProduct controller');
        res.status(500).json({message:'server error'});
    }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("error in removeAllfromcart controller");
    res.status(500).json({ message: "server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const { quantity } = req.body;

    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.if !== productId);
        await user.save();

        return res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    }else{
        res.status(404).json({message:'Product not founf'});
    }
  } catch (error) {
console.log('error in updateQuantity controller');
res.status(500).json({message:'server error'});
  }
};
