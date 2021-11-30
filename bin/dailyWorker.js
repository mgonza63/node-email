// const axios = require("axios");

// axios.get("https://emailcapsule.herokuapp.com/users").then((res) => {
//   console.log("Status Code:", res.status);
// })
// .catch(err => {
//   console.log('Error: ', err.message);
// });

const https = require('https');

https.get("https://emailcapsule.herokuapp.com/users");