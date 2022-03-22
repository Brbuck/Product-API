const Product = require("../models/Product");

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
  async create(req, res) {
    const { name_product, description_product, price, stock } = req.body;
    const productExist = await Product.findOne({ description_product });

    if (productExist) {
      res.status(400).json({ msg: "Product already exists!!" });
    }

    const newProduct = new Product({
      name_product,
      description_product,
      price,
      stock,
    });
    try {
      await newProduct.save();

      res.status(201).json({ msg: "Product was created successfuly!" });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async details(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json();
      }
      return res.json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(400).json({ msg: "Product does not exist in the system!!" });
    }
    product.name_product = req.body.name_product || product.name_product;
    product.description_product =
      req.body.description_product || product.description_product;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;

    try {
      const updateProdut = await product.save();
      res.status(201).json({ msg: "Product update successfuly" });
      console.log(updateProdut)
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json();
      }

      await product.deleteOne();

      return res.status(200).json({ msg: "Product delete successfuly" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
};
