const userController = {};
const userModel = require("../models/Users.model");
const auth = require("../helpers/Auth.helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { deleteImg } = require("../helpers/DeleteImg");

// read

userController.listUser = async (req, res) => {
  try {
    const user = await userModel.find({}, { contraseña: 0 });
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
    const { nombre, contacto, correo, contraseña, rol } = req.body;
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
      correo,
      contraseña: auth.encryptPassword(contraseña),
      rol,
    });

    if (req.file) {
      const { filename } = req.file;
      newUser.setimgUrl(filename);
    }

    await newUser.save();
    res.status(201).json({
      ok: true,
      message: "User Saved",
      nombre: newUser.nombre,
      contacto: newUser.contacto,
      correo: newUser.correo,
      _id: newUser._id,
      rol: newUser.rol,

      token: jwt.sign(
        {
          _id: newUser._id,
          nombre: newUser.nombre,
        },
        "abc123",
        { expiresIn: "1d" }
      ),
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
        message: "the user does not exist",
      });
    }
    if (user.nameImg) {
      deleteImg(user.nameImg);
    }
    await user.deleteOne();
    res.json({
      ok: true,
      message: "Deleted user",
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
        message: "the user does not exist",
      });
    }

    if (req.file) {
      if (user.nameImg) {
        deleteImg(user.nameImg);
      }
      const { filename } = req.file;
      user.setimgUrl(filename);
      await user.save();
    }

    const nombre = req.body.nombre || user.nombre;
    const contacto = req.body.contacto || user.contacto;
    const imagen = user.setimgUrl;
    const correo = req.body.correo || user.correo;
    const contraseña = req.body.contraseña || user.contraseña;
    const rol = req.body.rol || user.rol;
    const newUser = { nombre, contacto, imagen, correo, contraseña, rol };
    await user.updateOne(newUser);
    res.json({
      ok: true,
      message: "update user",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

userController.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const user = await userModel.findOne({ correo: correo });
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "email/password incorrectos",
      });
    }
    const respuesta = bcrypt.compareSync(contraseña, user.contraseña);
    if (respuesta) {
      return res.json({
        ok: true,
        message: "welcome",
        nombre: user.nombre,
        contacto: user.contacto,
        imagen: user.imagen,
        correo: user.correo,
        _id: user._id,
        rol: user.rol,

        token: jwt.sign(
          {
            _id: user._id,
            nombre: user.nombre,
          },
          "abc123",
          { expiresIn: "1d" }
        ),
      });
    }
    res.status(400).json({
      ok: false,
      message: "email/password incorrectos",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = userController;
