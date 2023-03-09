var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("../../app.js")

const exerciseScheme = new Schema({
    userId: Schema.Types.ObjectId,
    parentId: Schema.Types.ObjectId,
    exerciseName : String
  }, {collection: 'Exercise'});
  
  const Exercise = mongoose.model("Exercise", exerciseScheme);


  router.get('/', async function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.body.id);
  
    var data = await mongoose.models.Exercise.findById(id);
    
    res.send(data);
  });

  router.post('/', async function(req, res, next) {
    const exercise = new Exercise(req.body);
    await exercise.save();
    
    res.send(data);
  });
  
  router.delete('/', async function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.query.id);
  
    await mongoose.models.Exercise.findByIdAndRemove(id);
  
    res.sendStatus(200);
  });

  router.get('/byUserid', async function(req, res, next) {
    var userId = mongoose.Types.ObjectId(req.body.id);
  
    let data = await mongoose.models.Exercise.find({
      'userId': userId
    });
    
    res.send(data);
  });

  router.get('/byTrainingid', async function(req, res, next) {
    var trainingId = mongoose.Types.ObjectId(req.body.id);
  
    let data = await mongoose.models.Exercise.find({
      'parentId': trainingId
    });
    
    res.send(data);
  });

  module.exports = router;