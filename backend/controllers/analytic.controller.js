import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

async function getAnalyticsData(){

  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments(); 

  const salesData = await Order.aggregate([
   {
    $group: {
      _id:null,
      totalSales:{$sum:1},
      totalRevenue:{$sum:"$totalAmount"}
    }
   }
  ])

  const {totalSales , totalRevenue}=salesData[0] ||{totalSales:0,totalRevenue:0};

  return {
    users:totalUsers,
    products:totalProducts,
    totalSales,
    totalRevenue
  }

}

async function getDailySalesData(startDate , endDate) {
  

  // to do
  //3.7
}

export const getAnalytics=async(req , res)=>{
   try {
     const analyticsData = await getAnalyticsData();
     const endDate=new Date();
     const startDate = new Date(endDate.getTime()-7*24*60*60*1000);
     const dailySalesData = await getDailySalesData(startDate, endDate);
     res.json({
      analyticsData,
      dailySalesData
     })
   } catch (error) {
    res.status(500).json({message:""})
   } 
}