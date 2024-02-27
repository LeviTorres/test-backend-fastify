const fastify = require("fastify")();
const cors = require("@fastify/cors");
const userRoutes = require("./routes/users.route");
const taskRoutes = require("./routes/tasks.route");
const authRoutes = require("./routes/auth.route");
require("./utils/mongoose");

fastify.register(cors);

authRoutes.forEach(route => {
  fastify.route(route);
});

userRoutes.forEach(route => {
  fastify.route(route);
});

taskRoutes.forEach(route => {
  fastify.route(route);
});

const start = async () => {
  await fastify.listen(3000);
  fastify.log.info("Server" + fastify.server.address().port);
};

start();
