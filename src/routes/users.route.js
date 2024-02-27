const userCtrl = require("../controllers/users.controller");

const routes = [
  {
    url: "/users",
    method: "GET",
    handler: userCtrl.getUsers,
  },
  {
    url: "/users/:id",
    method: "GET",
    handler: userCtrl.getUserById,
  },
  {
    url: "/users",
    method: "POST",
    handler: userCtrl.createUser,
  },
  {
    url: "/users/:id",
    method: "PUT",
    handler: userCtrl.updateUser,
  },
  {
    url: "/users/:id",
    method: "DELETE",
    handler: userCtrl.deleteUser,
  },
];

module.exports = routes;
