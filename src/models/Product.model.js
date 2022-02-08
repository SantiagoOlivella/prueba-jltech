const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    img: { type: String },
    nameImg: { type: String },
    nombre: { type: String, required: true },
    valor: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, required: true },
  },
  { timestamps: true }
);

productSchema.methods.setimgUrl = function setimgUrl(filename) {
  const url = "http://localhost:4000/";
  this.img = url + "public/" + filename;
  this.nameImg = filename;
};

module.exports = model("product", productSchema);
