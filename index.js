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

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
// const mailOptions = {
//   from: '"Time Capsule ⏲️"<timecapsule866@gmail.com>',
//   to: "mau.gzz@icloud.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
