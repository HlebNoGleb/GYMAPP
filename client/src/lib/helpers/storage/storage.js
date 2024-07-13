import config from "../configs/config";
import trainingsJson from "../../testData/trainings.json"
import trainingExercisesJson from "../../testData/trainingExercises.json"
import oneExerciseHistory from "../../testData/oneExerciseHistory.json"
import weight from "../../testData/weight.json"

import trainings from "./Trainings/trainings";
import exercises from "./Exercises/exercises";
import history from "./History/history";

function getTrainings(){
    const trainingsArray = trainings.get();
    return trainingsArray;
}

function addNewTraining(newTraining){
    console.log(newTraining);
    trainings.add(newTraining);
}

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

/**
 * @param {Array} ids
 */
function getExercisesHistory(ids){
    const historyArray = history.getSome(ids);
    return historyArray;
}

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
    getTrainings, addNewTraining, getExercisesForAdd, addNewExercise, getTrainingExerciseByIds, getExerciseHistory, addNewExerciseHistory
}

export default storage;




