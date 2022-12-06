const express = require("express");
// const mongodb = require("mongodb").MongoClient;
const routes = require("./routes");

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const db = require("./config/connection");

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for social network running on port ${PORT}!`);
  });
});
