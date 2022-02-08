const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("./database");
const path = require("path");

const app = express();

app.set("port", 4000);
app.use('/public', express.static(__dirname + "/src/storage/imgs"));

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

//Rutas o vistas
app.use("/user", require("./src/routes/User.route"));
app.use("/client", require("./src/routes/Client.route"));
app.use("/product", require("./src/routes/Product.route"));
app.use("/shopping", require("./src/routes/Shopping.route"));

app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puertooo", app.get("port"));
});
