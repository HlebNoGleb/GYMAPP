var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("../../app.js")

const weightScheme = new Schema({
    date: Schema.Types.Number,
    weight: Schema.Types.Number,
    measure: Schema.Types.Number
  }, {collection: 'Weight'});
  

  const Weight = mongoose.model("Weight", weightScheme);


  router.get('/', async function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.query.id);
  
    var data =  await Weight.find({});
    
    res.json(data);
  });

  router.post('/', async function(req, res, next) {
    const weight = new Weight(req.body);
  
    await weight.save();
  
    res.sendStatus(200);
  });

  router.delete('/', async function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.query.id);
  
    await mongoose.models.Weight.findByIdAndRemove(id);
  
    res.sendStatus(200);
  });

  module.exports = router;