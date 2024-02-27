const User = require("../models/users.model");
const bcryptjs = require("bcryptjs");
const getUsers = async (request, reply) => {
  const users = await User.find();
  return users;
};

const getUserById = async (request, reply) => {
  const id = request.params.id;
  try {
    const user = await User.findById(id);

    if (!user) {
      return reply.code(404).send({
        msg: "User undefined",
      });
    }

    reply.send({
      user,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error get user by id",
    });
  }
};

const createUser = async (request, reply) => {
  const { email, password } = request.body;
  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return reply.code(400).send({
        msg: "Correo electronico ya registrado",
      });
    }

    const salt = bcryptjs.genSaltSync();
    const newPassword = bcryptjs.hashSync(password, salt);

    const user = new User({
      ...request.body,
      password: newPassword,
    });

    await user.save();

    reply.code(200).send({
      user,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error create user",
    });
  }
};

const updateUser = async (request, reply) => {
  //const tenant = req.header("tenant");
  const id = request.params.id;
  //const uid = req.uid;

  try {
    const user = await User.findById(id);
    if (!user) {
      return reply.code(404).send({
        msg: "user undefined",
      });
    }

    const changesUser = {
      ...request.body,
    };

    const userUpdated = await User.findByIdAndUpdate(id, changesUser, {
      new: true,
    });

    reply.send({
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error update user",
    });
  }
};

const deleteUser = async (request, reply) => {
  const uid = request.params.id;
  console.log({ uid });
  try {
    const userDB = await User.findById(uid);
    console.log({ userDB });
    if (!userDB) {
      return reply.code(404).send({
        msg: "user id does not exist",
      });
    }

    await User.findByIdAndDelete(uid);

    reply.send({
      msg: "User delete successfully",
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error delete user",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
