const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));

const dbURI =
  "mongodb+srv://m001-student:m001-password@sandbox.yqnjh.mongodb.net/webscrap?retryWrites=true&w=majority";
const db = mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

var connection = mongoose.connection;

let firstpost = [];
let indianexpress = [];
let indianexpress2 = [];
let indiatimes = [];
let indiatimes2 = [];
let moneycontrol = [];
let moneycontrol2 = [];
let firstpost2 = [];

connection.once("open", function () {
  connection.db.collection("firstposts", function (err, collection) {
    collection.find({}).toArray(function (err, data) {
      firstpost = data;
      firstpost2 = data.slice(1, 10);
    });
  });
  connection.db.collection("indianexpresses", function (err, collection) {
    collection.find({}).toArray(function (err, data) {
      indianexpress = data;
      indianexpress2 = data.slice(1, 10);
    });
  });
  connection.db.collection("indiatimes", function (err, collection) {
    collection.find({}).toArray(function (err, data) {
      indiatimes = data;
      indiatimes2 = data.slice(1, 10);
    });
  });
  connection.db.collection("moneycontrols", function (err, collection) {
    collection.find({}).toArray(function (err, data) {
      moneycontrol = data;
      moneycontrol2 = data.slice(1, 10);
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile("./src/index.html", { root: __dirname });
});

app.get("/firstpost", (req, res) => {
  res.header("Content-Type", "application/json");
  result = JSON.stringify(firstpost, null, 4);
  res.send(result);
});

app.get("/firstpost/sample", (req, res) => {
  res.header("Content-Type", "application/json");
  result = JSON.stringify(firstpost2, null, 4);
  res.send(result);
});

app.get("/indiatimes", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(indiatimes, null, 4));
});

app.get("/indiatimes/sample", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(indiatimes2, null, 4));
});

app.get("/indianexpress", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(indianexpress, null, 4));
});

app.get("/indianexpress/sample", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(indianexpress2, null, 4));
});

app.get("/moneycontrol", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(moneycontrol, null, 4));
});

app.get("/moneycontrol/sample", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(moneycontrol2, null, 4));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening at port 3000");
});
