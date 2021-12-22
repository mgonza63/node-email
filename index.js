const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const path = require('path')
require("dotenv").config();

const userRouter = require('./userRoutes');
const userModel = require("./userModel");

const nodemailer = require("nodemailer");
const https = require('https');
const http = require('http');

// Middlewares
app.use(morgan("tiny"));
app.use(helmet());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'));

app.use(userRouter);

app.use('/', express.static(path.join(__dirname, 'public')))


app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});


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

// http.get('http://localhost:8080/', async () => {
//   const users = await userModel.find({})
//   console.log(users)
// })

https.get("https://emailcapsule.herokuapp.com/users", async ()  => {

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; 
  let yyyy = today.getFullYear();

  
  if (dd < 10) {
     dd = '0' + dd;
  }
  
  if (mm < 10) {
     mm = '0' + mm;
  } 
      
  today = yyyy + '-' + mm + '-' + dd;
  console.log(today)
  let startOfToday = new Date(new Date(today).setUTCHours(00, 00, 00));
  let endOfDay = new Date(new Date(today).setUTCHours(23, 59, 59));

  const userMessageDue = await userModel.find({ sendDate:{ $gte: startOfToday, $lt: endOfDay } }).exec();
  if (userMessageDue.length != 0) {
      userMessageDue.forEach((userObject) => {
        const userEmail = userObject.email;
        const userMessage = userObject.message;
        const userDate = userObject.createdAt;
        const userId = userObject._id;

        console.log(`send message to user ${userId}: ${userObject} `);
        sendEmailToUser(userEmail, userMessage, userDate);

        // delete user object from db
        userModel.deleteOne({ _id: userId }, function (err) {
          if (err) return handleError(err);
        });
      });

    } else {
      console.log("no messages for today");
      // sendEmailToUser(process.env.EMAIL_USER, 'no messages due today', today);
    }

});