require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
//const session = require("express-session");
//const User = require("./models/user");
//const isAuthenticated =require("./middleware/auth");
const routes = require("./routes/authRoutes");
app.use(routes);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Mongo Connected");
})
.catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log("Server Started");
});