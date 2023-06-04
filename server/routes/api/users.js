var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var app = require("../../app.js");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');


const userScheme = new Schema({
    username: String,
    email: String,
    password: String,
    refresh_token: String
  }, {collection: 'Users'});

const User = mongoose.model("User", userScheme);

const userByEmail = async (email) => {

  let data = await mongoose.models.User.find({
    'email': email
  });

  return data;
};

const addUserToDb = async (newUser) => {

  return null;
  let data = await mongoose.models.User.find({
    'email': email
  });

  return data;
};

const verifyToken = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => resolve({err, data}))
  })
};

const auth = async (req, res, next) => {
  let authorization =  req.get('authorization');
  if (!authorization) return res.sendStatus(401);
  let {err, data} = await verifyToken(authorization, 'accessTokenSecret')
  if (err) {
    res.sendStatus(401)
  }
  req.authData = data;
  next()
};

router.post('/login', async function(req, res, next){
  let {email, password} = req.body;

  var passwordHash = await bcrypt.hash(password, 12);
  let usersByEmail = await userByEmail(email);
  
  let user = usersByEmail[0];
  if (user){
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.sendStatus(401);
    }

    const refreshToken = jwt.sign({id: user._id}, "refreshTokenSecret", {expiresIn: '600s'})
    res.set('set-cookie', `refreshToken=${refreshToken}; Path='user/refreshToken'; HttpOnly; Max-Age=600`)

    return res.sendStatus(200);

  } else {
    var userData = { username: email, email: email, password: passwordHash} 
    var newUser = new User(userData);
    user = newUser;
    user.id = 3213;

    await newUser.save();
    const refreshToken = jwt.sign({id: newUser._id}, "refreshTokenSecret", {expiresIn: '600s'})
    res.set('set-cookie', `refreshToken=${refreshToken}; Path='user/refreshToken'; HttpOnly; Max-Age=600`)

    return res.sendStatus(200);
  }

});

router.post('/byId', async function(req, res, next){
  var userId = mongoose.Types.ObjectId(req.body.id);

  let data = await mongoose.models.User.find({
    '_id': userId
  });

  res.json(data);
});

router.post('/getUser', auth, async function(req, res, next){
  console.log("test")
  console.log(req.authData);
  return res.send({test : "test"});
});

router.get('/token', async function(req, res, next){
  if (!req.headers.cookie) return res.sendStatus(401)
  const cookies = cookie.parse(req.headers.cookie || {});

  let {refreshToken} = cookies;

  if (!refreshToken) return res.sendStatus(401);
  let {err, data} = await verifyToken(refreshToken, "refreshTokenSecret");

  if (err) return res.sendStatus(401)

  let token = jwt.sign({id: data.id}, 'accessTokenSecret', {expiresIn: '15m'})
  res.send({ token })
});

module.exports = router;
  