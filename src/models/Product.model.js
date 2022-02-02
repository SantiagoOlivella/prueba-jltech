const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    imagen: { type: String, required: true },
    nombre: { type: String, required: true },
    valor: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("product", productSchema);
