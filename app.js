const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const flash = require("connect-flash");
const expressSession = require("express-session");

const app = express(); 

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "ajhsbcnjabsghjgcbjahkscbhjabkschja",
  })
);
app.use(flash());

const db = require("./config/mongoose-connection");

const indexRouter = require('./routes/index-router');
const hisaabRouter = require('./routes/hisaab-router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/hisaab', hisaabRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
