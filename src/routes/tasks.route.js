const taskCtrl = require("../controllers/tasks.controller");

const routes = [
  {
    url: "/tasks",
    method: "GET",
    handler: taskCtrl.getTasks,
  },
  {
    url: "/tasks/:id",
    method: "GET",
    handler: taskCtrl.getTaskById,
  },
  {
    url: "/tasks",
    method: "POST",
    handler: taskCtrl.createTask,
  },
  {
    url: "/tasks/:id",
    method: "PUT",
    handler: taskCtrl.updateTask,
  },
  {
    url: "/tasks/:id",
    method: "DELETE",
    handler: taskCtrl.deleteTask,
  },
];

module.exports = routes;
