const Product = require('../models/Product');
exports.getProductService = async ()=>{
    return await Product.find({});
}
exports.createProductService = async (data)=>{
  return await Product(data).save();
}