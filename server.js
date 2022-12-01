const express = require("express");
const mongodb = require("mongodb").MongoClient;
const routes = require("./routes");

const PORT = process.env.port || 3001;
const app = express();
const connectionString = `mongodb://127.0.0.1:27017/socialNetwork_db`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

let db;

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  }
);
