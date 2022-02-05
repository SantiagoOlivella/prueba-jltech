const bcrypt = require("bcrypt");
const auth = {};

auth.encryptPassword = (contraseña, req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);
    return hash;
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = auth;
