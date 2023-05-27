import config from "../configs/config";
import trainingsJson from "../../testData/trainings.json"
import trainingExercisesJson from "../../testData/trainingExercises.json"
import oneExerciseHistory from "../../testData/oneExerciseHistory.json"

import weights from "../storage/Weights/weights"
import trainings from "../storage/Trainings/trainings";
import exercises from "../storage/Exercises/exercises";
import history from "../storage/Exercises/History/history";


function getTrainings(){
    const trainingsArray = trainings.get();
    return trainingsArray;
}

function addNewTraining(newTraining){
    console.log(newTraining);
    trainings.add(newTraining);
}

/**
 * @param {Array} exercisesIds
 */
function getExercises(exercisesIds){
    const exercisesArray = exercises.get(exercisesIds);
    return exercisesArray;
}

function addNewExercise(newExercise){
    exercises.add(newExercise);
}

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


function removeHistory(newHistory){
    history.remove(newHistory);
}

/**
 * @param {Array} history
 */


/**
 * @param {Array} exercises
 */
function getTrainingExercise(exercises){
    if (config.useServer){
        return getTrainingExercisesFromServer(exercises);
    } else {
        return getTrainingsLocalStorage();
    }
}

/**
 * @param {Number} exerciseId
 */
function getExerciseHistory(exerciseId){
    if (config.useServer){
        return getExerciseHistoryFromServer(exerciseId);
    } else {
        return getTrainingsLocalStorage();
    }
}

function getWeight(){
    if (config.useServer){
        return getWeightFromServer();
    } else {
        return getWeightsLocalStorage();
    }
}

function addNewWeight(newWeight){
    weights.add(newWeight);
}

function changeWeight(newWeight){
    weights.change(newWeight);
}

function removeWeight(newWeight){
    weights.remove(newWeight);
}

async function getWeightFromServer(){
    const trainingPromise = new Promise(async (resolve, reject) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const response = await fetch("http://localhost:3001/weights/?id=64063abe393fad22e8d17028");
        if (response.ok) {
            const trainings = await response.json();
            // const trainings = weight;
            resolve(trainings)
        } else {
            reject("server error");
        }
    }).then(trainings => {
        return trainings;
    }).catch(err => {
        console.error(err);
        return null;
    })

    return trainingPromise;
}

async function getTrainingsFromServer(){
    const trainingPromise = new Promise(async (resolve, reject) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (response.ok) {
            //const trainings = await response.json();
            const trainings = trainingsJson;
            resolve(trainings)
        } else {
            reject("server error");
        }
    }).then(trainings => {
        return trainings;
    }).catch(err => {
        console.error(err);
        return null;
    })

    return trainingPromise;
}

async function getExercisesFromServer(){
    const trainingPromise = new Promise(async (resolve, reject) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (response.ok) {
            //const trainings = await response.json();
            const trainings = trainingsJson;
            resolve(trainings)
        } else {
            reject("server error");
        }
    }).then(trainings => {
        return trainings;
    }).catch(err => {
        console.error(err);
        return null;
    })

    return trainingPromise;
}

/**
 * @param {Array} exercises
 */
async function getTrainingExercisesFromServer(exercises){
    const trainingPromise = new Promise(async (resolve, reject) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (response.ok) {
            //const trainings = await response.json();
            const trainings = trainingExercisesJson;
            resolve(trainings)
        } else {
            reject("server error");
        }
    }).then(trainings => {
        return trainings;
    }).catch(err => {
        console.error(err);
        return null;
    })

    return trainingPromise;
}


/**
 * @param {Number} exerciseId
 */
async function getExerciseHistoryFromServer(exerciseId){
    const trainingPromise = new Promise(async (resolve, reject) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (response.ok) {
            //const trainings = await response.json();
            const trainings = oneExerciseHistory;
            resolve(trainings)
        } else {
            reject("server error");
        }
    }).then(trainings => {
        return trainings;
    }).catch(err => {
        console.error(err);
        return null;
    })

    return trainingPromise;
}

function getTrainingsLocalStorage(){
    const trainingPromise = new Promise(async (resolve, reject) => {
        const data = localStorage.getItem("trainings");
        if (data) {
            const trainings = JSON.parse(data);
            resolve(trainings);
        } else {
            reject("no data")
        }
    }).then(data => {
        return data;
    }).catch(err => {
        console.error(err);
        return [];
    })

    return trainingPromise;
}

function getWeightsLocalStorage(){
    const weightPromise = new Promise(async (resolve, reject) => {
        const data = localStorage.getItem("weights");
        if (data) {
            const weights = JSON.parse(data);
            console.log(weights)
            resolve(weights);
        } else {
            reject("no data")
        }
    }).then(data => {
        return data;
    }).catch(err => {
        console.error(err);
        return [];
    })

    return weightPromise;
}

const storage = {
    getTrainings,
    getExercises,
    getTrainingExercise,
    getExerciseHistory,
    getWeight,
    addNewWeight,
    changeWeight,
    removeWeight,
    addNewExercise,
    addNewTraining,//saveTrainings
    getHistory,
    addNewHistory,
    changeHistory,
    removeHistory
}

export default storage;




