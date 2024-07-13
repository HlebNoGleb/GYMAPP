var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("../../app.js")

const trainingScheme = new Schema({
    userId: Schema.Types.ObjectId,
    name: String,
    dates: {
      lastTrainingDate: Number
    },
    exercises : [{
      id: Schema.Types.ObjectId,
      exerciseName : String
    }]
  }, {collection: 'Trainings'});
  

  const Training = mongoose.model("Training", trainingScheme);


router.post('/', async function(req, res, next) {
  const training = new Training(req.body);

  await training.save();

  res.sendStatus(200);
});

router.get('/', async function(req, res, next) {
  var ids = req.query.ids.slice(1, -1);
  var array = ids.split(',').map(x => x.trim());

  var objectIds = array.map(x => mongoose.Types.ObjectId(x));
  let data = await mongoose.models.Training.find({
    '_id': {
      $in: objectIds
    }
  });

  res.json(data);
});

router.get('/byUserId', async function(req, res, next) {
  var userId = mongoose.Types.ObjectId(req.body.id);

  let data = await mongoose.models.Training.find({
    'userId': userId
  });

  res.json(data);
});

router.delete('/', async function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.query.id);
  
    await mongoose.models.Training.findByIdAndRemove(id);
  
    res.sendStatus(200);
  });

  module.exports = router;