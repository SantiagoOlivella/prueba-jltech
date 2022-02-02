const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    nombre: { type: String, required: true },
    contacto: { type: Number, required: true },
    correo: { type: String, required: true },
    shopping: {
      type: Schema.Types.ObjectId,
      ref: "shopping",
    },
  },
  { timestamps: true }
);

module.exports = model("client", clientSchema);
