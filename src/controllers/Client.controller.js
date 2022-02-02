const clientController = {};
const clientModel = require("../models/Client.model");

// read

clientController.listClient = async (req, res) => {
  try {
    const client = await clientModel.find().populate("shopping");
    res.json({
      ok: true,
      client,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//create

clientController.addClient = async (req, res) => {
  try {
    const { nombre, contacto, correo, shopping } = req.body;
    const validationClient = await clientModel.findOne({ correo: correo });
    if (validationClient) {
      return res.status(400).json({
        ok: false,
        message: "Client already exists",
      });
    }
    const newClient = new clientModel({
      nombre,
      contacto,
      correo,
      shopping,
    });
    await newClient.save();
    res.status(201).json({
      ok: true,
      message: "Client Saved",
      newClient,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// Delete

clientController.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientModel.findById({ _id: id });
    if (!client) {
      return res.status(404).json({
        ok: false,
        message: "the client does not exist",
      });
    }
    await client.deleteOne();
    res.json({
      ok: true,
      message: "Deleted client",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

//update

clientController.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientModel.findById({ _id: id });
    if (!client) {
      return res.status(404).json({
        ok: false,
        message: "the client does not exist",
      });
    }
    const nombre = req.body.nombre || client.nombre;
    const contacto = req.body.contacto || client.contacto;
    const correo = req.body.correo || client.correo;
    const shopping = req.body.shopping || client.shopping;
    const newClient = { nombre, contacto, correo, shopping }; 
    await client.updateOne(newClient);
    res.json({
      ok: true,
      message: "update client",
      newClient,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = clientController;
