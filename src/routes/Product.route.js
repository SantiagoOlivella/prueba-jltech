const { Router } = require("express");
const productController = require("../controllers/Product.controller");
const route = Router();
const verificarToken = require("../middlewares/Verifyjwt.Users");

route.get("/", verificarToken, productController.listProduct);
route.post("/add", verificarToken, productController.addProduct);
route.delete("/delete/:id", verificarToken, productController.deleteProduct);
route.put("/update/:id", verificarToken, productController.updateProduct);

module.exports = route;
