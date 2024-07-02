const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const app = express();
const path = require("path");

const passportSetup = require("./config/passport");
const authRoute = require("./routes/auth");
const expressSession = require("express-session");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  expressSession({
    name: "session",
    secret: "secret",
    keys: ["testing"],
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000,
    },
  })
);

app.use(express.static(path.join(__dirname, "./dist")));

app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "50mb",
  })
);
// app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});
