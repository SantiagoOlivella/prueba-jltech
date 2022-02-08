const { Router } = require("express");
const shoppingController = require("../controllers/Shopping.controller");
const route = Router();
const verificarToken = require("../middlewares/Verifyjwt.Users");

route.get("/", verificarToken, shoppingController.listShopping);
route.post("/add", verificarToken, shoppingController.addShopping);
route.delete("/delete/:id", verificarToken, shoppingController.deleteShopping);
route.put("/update/:id", verificarToken, shoppingController.updateShopping);

module.exports = route;
