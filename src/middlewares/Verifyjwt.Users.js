const jwt = require("jsonwebtoken");
const userModel = require("../models/Users.model");


const verificarToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      ok: false,
      message: "you are not autorized 1",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.status(401).json({
      ok: false,
      message: "you are not autorized 2",
    });
  }

  jwt.verify(token, "abc123", async (error, payload) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        message: "you are not autorized 3",
      });
    }
    const { _id } = payload;
    const user = await userModel.findById({ _id: _id });
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "you are not autorized 4",
      });
    }
    req.userid = payload._id;
    next();
  });
};

module.exports = verificarToken;
