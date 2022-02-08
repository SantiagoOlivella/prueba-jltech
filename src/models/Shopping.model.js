const { Schema, model } = require("mongoose");

const shoppingSchema = new Schema(
  {
    nFactura: { type: Number, required: true },
    fecha: { type: Date, required: true },
    cliente: { type: String, required: true },
    productos: { type: String, required: true },
    cantidad: { type: Number, required: true },
    valor: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("shopping", shoppingSchema);
