const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.connect(
  'mongodb+srv://backend_user:3O8QLWCI8FytuN8W@cluster0.hohmdjq.mongodb.net/products?retryWrites=true&w=majority'
)
.then(() => {
  console.log('Connected to database!');
})
.catch(err => {
  console.error('Connection failed!');
  console.error(err);
});


const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();
  console.log(typeof createdProduct._id);
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
