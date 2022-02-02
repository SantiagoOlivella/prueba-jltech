const { Router } = require("express");
const shoppingController = require("../controllers/Shopping.controller");
const route = Router();

route.get("/", shoppingController.listShopping);
route.post("/add", shoppingController.addShopping);
route.delete("/delete/:id", shoppingController.deleteShopping);
route.put("/update/:id", shoppingController.updateShopping);

module.exports = route;
