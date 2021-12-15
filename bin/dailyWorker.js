const userModel = require("../userModel");
const nodemailer = require("nodemailer");
const { DateTime } = require("luxon");

// Dev
const http = require("http");

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

// http.get("http://localhost:8080/users", async ()  => {
//     const users = await userModel.find({});
//     let today = DateTime.now().toISODate();

// try {
//     const userMessageDue = await userModel.find({ numberOfDays: today }).exec();
//     console.log(userMessageDue);
//     if (userMessageDue.length != 0) {
//         userMessageDue.forEach((userObject) => {
//           const userEmail = userObject.email;
//           const userMessage = userObject.message;
//           const userDate = userObject.createdAt;
//           const userId = userObject._id;
  
//           console.log(`send message to user ${userId}: ${userObject} `);
//         //   sendEmailToUser(userEmail, userMessage, userDate);
  
//           // delete user object from db
//           // userModel.deleteOne({ _id: userId }, function (err) {
//           //   if (err) return handleError(err);
//           // });
//         });
  
//       } else {
//         console.log("no messages for today");
//         // sendEmailToUser(process.env.EMAIL_USER, 'no messages due today', today);
//       }
// } catch (error) {
//     console.log(error);

// }
// });

// Production
const https = require('https');

https.get("https://emailcapsule.herokuapp.com/users", async ()  => {
    const users = await userModel.find({});
    let today = DateTime.now().toISODate();
try {
    const userMessageDue = await userModel.find({ numberOfDays: today }).exec();
    console.log(userMessageDue);
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
} catch (error) {
    console.log(error);

}
});
