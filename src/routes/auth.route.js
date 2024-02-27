const authCtrl = require("../controllers/auth.controller");

const routes = [
  {
    url: "/login",
    method: "POST",
    handler: authCtrl.login,
  },
];

module.exports = routes;
