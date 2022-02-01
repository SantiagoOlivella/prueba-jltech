const { Router } = require("express");
const userController = require("../controllers/User.controller");
const route = Router();

route.get("/", userController.listUser);
route.post("/add", userController.addUser);
route.delete("/delete/:id", userController.deleteUser);
route.put("/update/:id", userController.updateUser);

module.exports = route;
