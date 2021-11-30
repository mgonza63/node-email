const express = require("express");
const app = express();

app.get("/users", async (req, res) => {
    console.log('worker working')
});