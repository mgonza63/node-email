const express = require("express");
const userModel = require("./userModel");
const app = express();
require("dotenv").config();


app.get("/users", async (req, res) => {
  const users = await userModel.find({});


  try {
    // Insomnia test
    res.send(users);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  const user = new userModel({
    email: req.body.email,
    message: req.body.message,
    sendDate: req.body.sendDate,
    // numberOfDays: DateTime.now()
    //   .plus({ days: req.body.numberOfDays })
    //   .toISODate(),
  });
  console.log(user);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) res.status(404).send("user not found");
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete("/users", async (req, res) => {
  const allUsers = await userModel.deleteMany({});
});
module.exports = app;
