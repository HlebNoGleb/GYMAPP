import config from "../configs/config";
import trainingsJson from "../../testData/trainings.json"
import trainingExercisesJson from "../../testData/trainingExercises.json"
import oneExerciseHistory from "../../testData/oneExerciseHistory.json"
import weight from "../../testData/weight.json"

import trainings from "./Trainings/trainings";
import exercises from "./Exercises/exercises";
import history from "./History/history";
import weights from "../storage/Weights/weights"
import trainings from "../storage/Trainings/trainings";
import exercises from "../storage/Exercises/exercises";
import history from "../storage/Exercises/History/history";

// ------------- TRAININGS -------------
function getTrainings(){
    const trainingsArray = trainings.get();
    return trainingsArray;
}

function addNewTraining(newTraining){
    console.log(newTraining);
    trainings.add(newTraining);
}

function changeTraining(training){
    console.log(training);
    trainings.change(training);
}


function removeTraining(id){
    trainings.remove(id);
}

function uploadTraining(newTraining){
    return trainings.upload(newTraining);
}


// ------------- EXERCISES -------------
/**
 * @param {Array} exercisesIds
 */
function getExercises(exercisesIds, withLastHistory = false, byDate = ""){
    console.log(withLastHistory);
    const exercisesArray = exercises.get(exercisesIds, withLastHistory, byDate);
function getExercisesForAdd(){
    const exercisesArray = exercises.get();
    return exercisesArray;
}

function getTrainingExerciseByIds(ids){
    const exercisesArray = exercises.get(ids);
    const exercisesHistory = history.getSome(ids);

    return exercisesArray;
}

function addNewExercise(newExercise){
    exercises.add(newExercise);
}


function changeExercise(newExercise){
    exercises.change(newExercise);
}


function removeExercise(newExercise){
    exercises.remove(newExercise);
}

function uploadExercise(newExercise){
    return exercises.upload(newExercise);
}

// ------------- HISTORY -------------
/**
 * @param {Number} exercisesId
 */
async function getHistory(exercisesId){
    const historyArray = history.get(exercisesId);
    return historyArray;
}

function addNewHistory(newHistory){
    history.add(newHistory);
}


function changeHistory(newHistory){
    history.change(newHistory);
}
/**
 * @param {Array} ids
 */
function getExercisesHistory(ids){
    const historyArray = history.getSome(ids);
    return historyArray;
}


function removeHistory(newHistory){
    history.remove(newHistory);
}

async function getCalendar(){
    const calendar = history.getCalendar();
    return calendar;
}

// ------------- WEIGHT -------------

function getWeight(){
    return weights.get();
}

function addNewWeight(newWeight){
    weights.add(newWeight);
}

function changeWeight(newWeight){
    weights.change(newWeight);
}

function removeWeight(newWeight){
    weights.remove(newWeight);
/**
 * @param {Array} id
 */
function getExerciseHistory(id){
    const historyArray = history.getOne(id);
    return historyArray;
}

function addNewExerciseHistory(newHistory){
    history.add(newHistory);
}

const storage = {
    getTrainings, getExercises, getTrainingExercise, getExerciseHistory, getWeight, addNewExercise, addNewTraining//saveTrainings
}

export default storage;




