const Task = require("../models/tasks.model");

const getTasks = async (request, reply) => {
  //const user = req.user;

  const tasks = await Task.find();
  return tasks;
};

const getTaskById = async (request, reply) => {
  const id = request.params.id;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return reply.code(404).send({
        msg: "Task undefined",
      });
    }

    reply.send({
      task,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error get task by id",
    });
  }
};

const createTask = async (request, reply) => {
  try {
    const task = new Task({
      ...request.body,
    });

    await task.save();

    reply.send({
      task,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error create task",
    });
  }
};

const updateTask = async (request, reply) => {
  const id = request.params.id;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return reply.code(404).send({
        msg: "task undefined",
      });
    }

    const changesTask = {
      ...request.body,
    };

    const taskUpdated = await Task.findByIdAndUpdate(id, changesTask, {
      new: true,
    });

    reply.send({
      task: taskUpdated,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error update task",
    });
  }
};

const deleteTask = async (request, reply) => {
  const uid = request.params.id;
  try {
    const taskDB = await Task.findById(uid);
    if (!taskDB) {
      return reply.code(404).send({
        msg: "task id does not exist",
      });
    }

    await Task.findByIdAndDelete(uid);

    reply.send({
      msg: "Task delete successfully",
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({
      msg: "Error delete task",
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
