const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    contacto: { type: Number, required: true },
    img: { type: String },
    correo: { type: String, required: true },
    contraseña: { type: String, required: true },
    rol: { type: String, required: true },
    nameImg:{type:String}
  },
  { timestamps: true }
);
userSchema.methods.setimgUrl = function setimgUrl(filename) {
  const url = "http://localhost:4000/";
  this.img = url + 'public/'+ filename;
  this.nameImg = filename;
};

module.exports = model("user", userSchema);
