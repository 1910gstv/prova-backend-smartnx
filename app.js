const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const swaggerApp = require("./swagger");


const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use(swaggerApp)

app.use((req, res, next) => {
  res.status(404).json({
    erro: {
      mensagem: "Rota não encontrada",
    },
  });
});

module.exports = app;
