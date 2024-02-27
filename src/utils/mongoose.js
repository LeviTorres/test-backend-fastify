const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://levi962009:UT9OKXoWt9ezrVcw@cluster0.5cfqozj.mongodb.net/test-fastify";

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch(err => console.error("Error de conexión a MongoDB:", err));
