const User = require("../models/users.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (request, reply) => {
  const { email, password } = request.body;
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return reply.code(404).send({
        msg: "Correo electronico y/o Contraseña invalida",
      });
    }

    const validPassword = bcryptjs.compareSync(password, userDB.password);
    if (!validPassword) {
      return reply.code(400).send({
        msg: "Correo electronico y/o Contraseña invalida",
      });
    }

    const payload = { id: userDB._id };
    const token = jwt.sign({ payload }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    //reply.setCookie("token", token);

    reply.send({
      token,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error login",
    });
  }
};

module.exports = {
  login,
};
