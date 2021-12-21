# Email "Time" Capsule
This website takes in an email address, a message, and a date in the future. Next, it send the data to the backend and saves it on a Mongo Database. 

When the object's date matches the current date the message is sent with node-email and Heroku Scheduler. Finally, the object gets deleted from the database. 

This is a small project I came up with trying to test my Node.js, Express, and MongoDB skills.
[Link to Site](https://emailcapsule.herokuapp.com/)


## Built with:

* Node.js
* Express
* MongoDb
* Heroku