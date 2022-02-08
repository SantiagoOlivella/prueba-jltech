const { Router } = require("express");
const productController = require("../controllers/Product.controller");
const route = Router();
const verificarToken = require("../middlewares/Verifyjwt.Users");
const upLoad = require("../middlewares/ImgUpload");

route.get("/", verificarToken, productController.listProduct);
route.post(
  "/add",
  upLoad.single("img"),
  verificarToken,
  productController.addProduct
);
route.delete("/delete/:id", verificarToken, productController.deleteProduct);
route.put(
  "/update/:id",
  upLoad.single("img"),
  verificarToken,
  productController.updateProduct
);

module.exports = route;
