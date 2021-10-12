const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/user");
const app = express();

require("dotenv").config({ path: "./config/.env" });
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "mongoose",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongodb connected.");
  })
  .catch(() => {
    console.error("mongodb not connected.");
  });

app.listen(7000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server is up and running on port 7000");
  }
});

app.get("/getUser", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err.message));
});

app.post("/postUser", (req, res) => {
  const { name, age, email, phone } = req.body;
  let newUser = new User({
    name,
    age,
    email,
    phone,
  });
  newUser
    .save()
    .then(res.send(req.body))
    .catch((err) => console.error(err.message));
});

app.put("/putUser/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(res.send(req.body))
    .catch((err) => console.error(err.message));
});

app.delete("/deleteUser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(res.send("User Deleted"))
    .catch((err) => console.error(err.message));
});