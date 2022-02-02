const { Router } = require("express");
const productController = require("../controllers/Product.controller");
const route = Router();

route.get("/", productController.listProduct);
route.post("/add", productController.addProduct);
route.delete("/delete/:id", productController.deleteProduct);
route.put("/update/:id", productController.updateProduct);

module.exports = route;
