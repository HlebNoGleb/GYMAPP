var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("../../app.js")

const trainingHistoryScheme = new Schema({
    exerciseID: Schema.Types.ObjectId,
    date: Schema.Types.Date,
    sets : [{
        weight: Schema.Types.Number,
        count: Schema.Types.Number
    }]
  }, {collection: 'TrainingHistory'});
  
  const TrainingHistory = mongoose.model("TrainingHistory", trainingHistoryScheme);


  router.get('/', async function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.body.id);
  
    var data = await mongoose.models.TrainingHistory.findById(id);
    
    res.send(data);
  });

  router.post('/', async function(req, res, next) {
    const trainingHistory = new TrainingHistory(req.body);
    await trainingHistory.save();
    
    res.send(data);
  });
  
  router.delete('/', async function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.body.id);
  
    await mongoose.models.TrainingHistory.findByIdAndRemove(id);
  
    res.sendStatus(200);
  });

  module.exports = router;