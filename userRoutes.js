const express = require("express");
const userModel = require("./userModel");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();
const { DateTime } = require("luxon");

const nodeCron = require("node-cron");


// nodeCron.schedule('0 0 0 * * *', () => {
//   This job will run every mdinight
//   console.log(new Date().toLocaleTimeString());
// });

function sendEmailToUser(email, message, date) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: '"Time Capsule ⏲️"<timecapsule866@gmail.com>',
    to: email,
    subject: `this is your time capsule message from ${date}`,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.get("/users", async (req, res) => {
  // const users = await userModel.find({});
  let today = DateTime.now().toISODate();

  try {
    // Insomnia test
    // res.send(users);

    const userMessageDue = await userModel.find({ numberOfDays: today }).exec();
    if (userMessageDue.length != 0) {
      userMessageDue.forEach((userObject) => {
        const userEmail = userObject.email;
        const userMessage = userObject.message;
        const userDate = userObject.createdAt;
        console.log(userObject);
        sendEmailToUser(userEmail, userMessage, userDate);
      });
    } else {
      console.log("no messages for today");
      // sendEmailToUser(process.env.EMAIL_USER, 'no messages due today', today);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  const user = new userModel({
    email: req.body.email,
    message: req.body.message,
    numberOfDays: DateTime.now()
      .plus({ days: req.body.numberOfDays })
      .toISODate(),
    //  .toISODate(), .toFormat("ccc LLL dd yyyy")
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
