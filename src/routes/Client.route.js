const { Router } = require("express");
const clientController = require("../controllers/Client.controller");
const route = Router();

route.get("/", clientController.listClient);
route.post("/add", clientController.addClient);
route.delete("/delete/:id", clientController.deleteClient);
route.put("/update/:id", clientController.updateClient);

module.exports = route;
