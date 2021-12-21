const userModel = require("../userModel");
const nodemailer = require("nodemailer");
const https = require('https');

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

let startOfToday = new Date(new Date(today).setUTCHours(00, 00, 00));
let endOfDay = new Date(new Date(today).setUTCHours(23, 59, 59));
    try {
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
} catch (error) {
    console.log(error);

}
});
