const app = require("./app");
const { initMongo } = require("./src/config/mongoose");
const PORT = 8080;

initMongo();
const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

server.on("error", (err) => {
  console.error(err);
});
