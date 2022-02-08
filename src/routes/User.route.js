const { Router } = require("express");
const userController = require("../controllers/User.controller");
const upLoad = require("../middlewares/ImgUpload");
const route = Router();
const verificarToken = require("../middlewares/Verifyjwt.Users");

route.get("/", userController.listUser);
route.post("/add",upLoad.single("img"), userController.addUser);
route.delete("/delete/:id", verificarToken, userController.deleteUser);
route.put("/update/:id",upLoad.single("img"), verificarToken, userController.updateUser);
route.post("/login", userController.login);

module.exports = route;
