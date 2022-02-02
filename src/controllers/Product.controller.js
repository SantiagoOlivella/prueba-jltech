const productController = {};
const productModel = require("../models/Product.model");

// read

productController.listProduct = async (req, res) => {
  try {
    const product = await productModel.find();
    res.json({
      ok: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//create

productController.addProduct = async (req, res) => {
  try {
    const { imagen, nombre, valor, stock, categoria } = req.body;
    const validationProduct = await productModel.findOne({ nombre: nombre });
    if (validationProduct) {
      return res.status(400).json({
        ok: false,
        message: "product already exists",
      });
    }
    const newProduct = new productModel({
      imagen,
      nombre,
      valor,
      stock,
      categoria,
    });
    await newProduct.save();
    res.status(201).json({
      ok: true,
      message: "product Saved",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// Delete

productController.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "the product does not exist",
      });
    }
    await product.deleteOne();
    res.json({
      ok: true,
      message: "Deleted product",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//update

productController.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "the product does not exist",
      });
    }

    const imagen = req.body.imagen || product.imagen;
    const nombre = req.body.nombre || product.nombre;
    const valor = req.body.valor || product.valor;
    const stock = req.body.stock || product.stock;
    const categoria = req.body.categoria || product.categoria;
    const newProduct = { imagen, nombre, valor, stock, categoria };
    await product.updateOne(newProduct);
    res.json({
      ok: true,
      message: "update product",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = productController;
