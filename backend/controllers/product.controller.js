import { redis } from "../lib/redis.js"
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProduct = (req , res)=>{

}

export const getFeaturedProducts=async(req , res)=>{
try {
    let featuredProducts = await redis.get("featured_products");
    if(featuredProducts){
       return res.json(JSON.parse(featuredProducts))
    }

    featuredProducts = await Product.find({isFeatured:true}).lean();

    if(!featuredProducts ){
        return res.status(404).json({message:"no featured product found"})
    }

    await redis.set("featured_products" , JSON.stringify(featuredProducts));

    res.json(featuredProducts);

    console.log('product is given');
    
} catch (error) {
    console.log(error);
    
}
}

export const createProduct = async(req ,res)=>{

    try {
        const {name , description , price , image , category} = req.body;
        let cloudinaryResponse = null;

      if(image){
 cloudinaryResponse=await cloudinary.uploader.upload(image , {folder:"products"})
      }

const product = await Product.create({
    name,
    description,
    price,
    image:cloudinaryResponse?.secure_url?cloudinaryResponse.secure_url:"",
    category
})

res.status(201).json(product);
    } catch (error) {
        
    }
}

export const deleteProduct = async(req , res)=>{

    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
        }

        try {
            await cloudinary.uploader.destroy(`products/${publicId}`);
        } catch (error) {
            console.log('error in deleting from cloudinary');
            
        }
 await Product.findByIdAndDelete(req.params.id);
res.json({message:"product deleted successfully"})
    } catch (error) {
       console.log('error in deleteProduct controller');
       res.status(500).json({message:"enternal server error"})
        
    }
}


export const getProductByCategory=async(req , res)=>{
    try {
        const {category} = req.params;
        const products = await Product.find({category});
        res.json(products)
    } catch (error) {
        console.log('error in getProductByCategory controller' , error.message);
        res.status(500).json({message:"internl server error"})
        
    }
}
export const toggleFeaturedProduct = async(req , res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await Product.save();
            await updateFeaturedProductsCache();

            res.json(updatedProduct)
        }else{
           res.status(404).json({message:"product not found"}); 
        }
    } catch (error) {
        console.log('error in toggleFeaturedProduct controller');
        res.status(500).json({message:"internal server error"});
    }
}


async function updateFeaturedProductsCache() {
    try {
        // The lean() method is used to return plain javaScript objects instead of full mongoose document.
        const featuredProducts = await Product.find({isFeatured:true}).lean();
        await redis.set("featured_products" , JSON.stringify(featuredProducts));
    } catch (error) {
        console.log('error in updatecache ');
        res.status(500).json({message:"internal server error"});
    }
}