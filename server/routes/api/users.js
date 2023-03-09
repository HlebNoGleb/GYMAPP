var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("../../app.js")

const userScheme = new Schema({
    username: String,
    email: String,
    password: String,
    refresh_token: String
  }, {collection: 'Users'});
  

  const User = mongoose.model("User", userScheme);

  