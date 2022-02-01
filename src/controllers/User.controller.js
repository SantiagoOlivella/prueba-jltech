const userController = {};
const userModel = require("../models/Users.model");

// read

userController.listUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//create

userController.addUser = async (req, res) => {
  try {
    const { nombre, contacto, imagen, correo, contraseña, rol } = req.body;
    const validationUser = await userModel.findOne({ correo: correo });
    if (validationUser) {
      return res.status(400).json({
        ok: false,
        message: "User already exists",
      });
    }
    const newUser = new userModel({
      nombre,
      contacto,
      imagen,
      correo,
      contraseña,
      rol,
    });
    await newUser.save();
    res.status(201).json({
      ok: true,
      message: "User Saved",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// Delete

userController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "the note does not exist",
      });
    }
    await user.deleteOne();
    res.json({
      ok: true,
      message: "Deleted Note",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//update

userController.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "the note does not exist",
      });
    }
    const nombre = req.body.nombre || user.nombre;
    const contacto = req.body.contacto || user.contacto;
    const imagen = req.body.imagen || user.imagen;
    const correo = req.body.correo || user.correo;
    const contraseña = req.body.contraseña || user.contraseña;
    const rol = req.body.rol || user.rol;
    const newUser = { nombre, contacto, imagen, correo, contraseña, rol };
    await user.updateOne(newUser);
    res.json({
      ok: true,
      message: "update Note",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = userController;
