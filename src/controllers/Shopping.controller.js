const shoppingController = {};
const shoppingModel = require("../models/Shopping.model");

// read

shoppingController.listShopping = async (req, res) => {
  try {
    const shopping = await shoppingModel.find();
    res.json({
      ok: true,
      shopping,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//create

shoppingController.addShopping = async (req, res) => {
  try {
    const { nFactura, fecha, cliente, productos, cantidad, valor } = req.body;
    const validationShopping = await shoppingModel.findOne({
      nFactura: nFactura,
    });
    if (validationShopping) {
      return res.status(400).json({
        ok: false,
        message: "shopping already exists",
      });
    }
    const newShopping = new shoppingModel({
      nFactura,
      fecha,
      cliente,
      productos,
      cantidad,
      valor,
    });
    await newShopping.save();
    res.status(201).json({
      ok: true,
      message: "shopping Saved",
      newShopping,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// Delete

shoppingController.deleteShopping = async (req, res) => {
  try {
    const { id } = req.params;
    const shopping = await shoppingModel.findById({ _id: id });
    if (!shopping) {
      return res.status(404).json({
        ok: false,
        message: "the shopping does not exist",
      });
    }
    await shopping.deleteOne();
    res.json({
      ok: true,
      message: "Deleted shopping",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//update

shoppingController.updateShopping = async (req, res) => {
  try {
    const { id } = req.params;
    const shopping = await shoppingModel.findById({ _id: id });
    if (!shopping) {
      return res.status(404).json({
        ok: false,
        message: "the shopping does not exist",
      });
    }

    const nFactura = req.body.nFactura || shopping.nFactura;
    const fecha = req.body.fecha || shopping.fecha;
    const cliente = req.body.cliente || shopping.cliente;
    const productos = req.body.productos || shopping.productos;
    const cantidad = req.body.cantidad || shopping.cantidad;
    const valor = req.body.valor || shopping.valor;
    const newShopping = {
      nFactura,
      fecha,
      cliente,
      productos,
      cantidad,
      valor,
    };
    await shopping.updateOne(newShopping);
    res.json({
      ok: true,
      message: "update shopping",
      newShopping,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = shoppingController;
