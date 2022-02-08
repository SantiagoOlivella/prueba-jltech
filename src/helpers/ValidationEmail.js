const valitionEmailControler = {};
const userModel = require("../models/Users.model");
const validationRol = require("../helpers/ValidationRol");

valitionEmailControler.validarRol = async (correo) => {
  try {
    const user = await userModel.findOne({ correo: correo });
    validationRol(user.rol)
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports = valitionEmailControler;
