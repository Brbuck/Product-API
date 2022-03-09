const Product = require("../models/Product");

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async create(req, res) {
    const { name_product, description_product, price, stock } = req.body;
    const productExist = await Product.findOne({ description_product });

    if (productExist) {
      res.status(400).json({ error: "Produto já existe!!" });
    }

    try {
      const newProduct = await Product.create({
        name_product,
        description_product,
        price,
        stock,
      });
      res.status(201).json(newProduct);
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
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(400).json({ error: "Produto não existe!!" });
    }
    product.name_product = req.body.name_product || product.name_product;
    product.description_product =
      req.body.description_product || product.description_product;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;

    try {
      const updateProdut = await product.save();
      res.status(201).json(updateProdut);
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

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
