const productController = {};
const productModel = require("../models/Product.model");
const { deleteImg } = require("../helpers/DeleteImg");

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
    const { nombre, valor, stock, categoria } = req.body;
    const validationProduct = await productModel.findOne({ nombre: nombre });
    if (validationProduct) {
      return res.status(400).json({
        ok: false,
        message: "product already exists",
      });
    }
    const newProduct = new productModel({
      nombre,
      valor,
      stock,
      categoria,
    });

    if (req.file) {
      const { filename } = req.file;
      newProduct.setimgUrl(filename);
    }

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
    if (product.nameImg) {
      deleteImg(product.nameImg);
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

    if (req.file) {
      if (product.nameImg) {
        deleteImg(product.nameImg);
      }
      const { filename } = req.file;
      product.setimgUrl(filename);
      await product.save();
    }

    const nombre = req.body.nombre || product.nombre;
    const valor = req.body.valor || product.valor;
    const stock = req.body.stock || product.stock;
    const categoria = req.body.categoria || product.categoria;
    const newProduct = { nombre, valor, stock, categoria };
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
