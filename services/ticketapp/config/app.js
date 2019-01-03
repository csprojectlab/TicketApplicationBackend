const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');
const passport = require('passport')
const passportConfig = require("./passport")(passport);
const jwt = require("jsonwebtoken");

app.use(express.static("."))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors())
app.use(passport.initialize());

consign()
    .include('ticketapp/app/setup')
    .then('ticketapp/app/api')
    .then('ticketapp/app/routes')
    .into(app)

module.exports = app;