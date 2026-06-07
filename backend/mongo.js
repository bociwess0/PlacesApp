const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://backend_user:3O8QLWCI8FytuN8W@cluster0.hohmdjq.mongodb.net/products?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db();

    const result = await db.collection("products").insertOne(newProduct);

    res.json({
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not store data.",
    });
  } finally {
    await client.close();
  }
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve products." });
  }
  client.close();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
