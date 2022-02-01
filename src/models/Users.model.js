const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    contacto: { type: Number, required: true },
    imagen: { type: String, required: true },
    correo: { type: String, required: true },
    contraseña: { type: String, required: true },
    rol: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("user", userSchema);
