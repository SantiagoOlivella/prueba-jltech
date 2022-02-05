const { Router } = require("express");
const clientController = require("../controllers/Client.controller");
const route = Router();
const verificarToken = require("../middlewares/Verifyjwt.Users");

route.get("/", verificarToken, clientController.listClient);
route.post("/add", verificarToken, clientController.addClient);
route.delete("/delete/:id", verificarToken, clientController.deleteClient);
route.put("/update/:id", verificarToken, clientController.updateClient);

module.exports = route;
