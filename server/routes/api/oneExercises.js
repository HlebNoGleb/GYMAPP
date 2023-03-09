var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("../../app.js")


const oneExerciseScheme = new Schema({
    exerciseId: Schema.Types.ObjectId,
    date: Schema.Types.Number,
    podhods : [{
        weight: Schema.Types.Number,
        count: Schema.Types.Number
    }]
  }, {collection: 'OneExercise'});
  
  const OneExercise = mongoose.model("OneExercise", oneExerciseScheme);


  router.get('/', async function(req, res, next) {
    var exerciseId = mongoose.Types.ObjectId(req.body.id);

    let data = await mongoose.models.OneExercise.find({
      'exerciseId': exerciseId
    });
  
    res.json(data);
  });

  module.exports = router;