import config from "../../configs/config";
import trainingsJson from "../../../testData/trainings.json"
import random from "../../random";
import exercises from "../Exercises/exercises";
import arrayHelper from "../../array";

interface Training {
    id: string
    userId?: string,
    name: string,
    dates?: {
        lastTrainingDate: number,
        createDate: number
    },
    exercises: number[]
    exercisesData: []
}


const keys = {
    trainings: "trainings"
}


const trainings = {
    keys,
    get,
    add,
    change,
    remove,
    upload,
    addExerciseToTraining
}

export default trainings

function get(trainingIds: Array<string> = [], withExercises: boolean = false){
    if (config.useServer){
        return getTrainingsFromServer();
    } else {
        return getTrainingsFromLocalStorage(trainingIds, withExercises);//getTrainingsLocalStorage();
    }
}
/**
@param {Training} newTraining
**/
function add(newTraining: Training){
    console.log(newTraining);
    if (config.useServer){
        return null;
    } else {
        return addNewTrainingToLocalStorage(newTraining)//getTrainingsLocalStorage();
    }
}

/**
@param {Training} newTraining
**/
function upload(newTraining: Training){
    console.log(newTraining);
    if (config.useServer){
        return null;
    } else {
        return uploadNewTrainingToLocalStorage(newTraining)//getTrainingsLocalStorage();
    }
}

/**
@param {Training} training
**/
function change(training: Training){
    console.log(training);
    if (config.useServer){
        return null;
    } else {
        return changeTrainingInLocalStorage(training);
    }
}

function remove(id: Number){
    if (config.useServer){
        return null;
    } else {
        return removeTrainingFromLocalStorage(id);//getTrainingsLocalStorage();
    }
}


async function getTrainingsFromServer(){
    const trainingPromise = new Promise(async (resolve, reject) => {
        await new Promise(resolve => setTimeout(resolve, 50));
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


async function getTrainingsFromLocalStorage(trainingIds, withExercises) {
    try {
        await new Promise(resolve => setTimeout(resolve, 50));
        const trainingsStr = localStorage.getItem(keys.trainings);
        let trainings = trainingsStr ? JSON.parse(trainingsStr) : [];

        if (trainingIds && arrayHelper.hasData(trainingIds)) {
            trainings = trainings.filter(x => trainingIds.includes(x.id));
        }

        if (withExercises) {
            let trainingsWithExercises = await getTrainingsExercises(trainings);
            return trainingsWithExercises;
        }

        return trainings;

    } catch (error) {
      console.error(`Failed to get objects from localStorage: ${error}`);
      return [];
    }
}

async function getTrainingsExercises(trainings){
    const trainingWithExercises = [];
    for (const training of trainings) { // foreach not work with async/await
        const exercisesIds = training.exercises;
        console.log(exercisesIds);
        if (arrayHelper.hasData(exercisesIds)) {
            let data = await exercises.get(exercisesIds);
            training.exerciseData = data;
        }

        trainingWithExercises.push(training);
    }

    return trainingWithExercises;
}

function addNewTrainingToLocalStorage(newTraining){
    try {
        newTraining.id = random.generageUniqueId();
        newTraining.dates = {createDate: new Date().getTime()}
        console.log(newTraining);
        const trainings = localStorage.getItem(keys.trainings);
        const trainingsArray = trainings ? JSON.parse(trainings) : [];
        trainingsArray.push(newTraining);
        localStorage.setItem(keys.trainings, JSON.stringify(trainingsArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

function uploadNewTrainingToLocalStorage(newTraining){
    try {
        newTraining.id = random.generageUniqueId();
        newTraining.dates = {createDate: new Date().getTime()}
        const trainings = localStorage.getItem(keys.trainings);
        const trainingsArray = trainings ? JSON.parse(trainings) : [];
        trainingsArray.push(newTraining);
        localStorage.setItem(keys.trainings, JSON.stringify(trainingsArray));
        return newTraining;
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

function changeTrainingInLocalStorage(training){
    try {
        const id = training.id;
        const trainings = localStorage.getItem(keys.trainings);
        const trainingsArray = trainings ? JSON.parse(trainings) : [];
        const trainingForChangeIndex = trainingsArray.findIndex(x=>x.id === id);
        trainingsArray[trainingForChangeIndex] = training;
        localStorage.setItem(keys.trainings, JSON.stringify(trainingsArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

function removeTrainingFromLocalStorage(id){
    try {
        const trainings = localStorage.getItem(keys.trainings);
        const trainingsArray = trainings ? JSON.parse(trainings) : [];
        const trainingRemoveIndex = trainingsArray.findIndex(x=>x.id === id);
        trainingsArray.splice(trainingRemoveIndex, 1);
        localStorage.setItem(keys.trainings, JSON.stringify(trainingsArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

function addExerciseToTraining(trainingId, exerciseId){
    try {
        const trainings = localStorage.getItem(keys.trainings);
        const trainingsArray = trainings ? JSON.parse(trainings) : [];
        const trainingForChangeIndex = trainingsArray.findIndex(x=>x.id === trainingId);
        trainingsArray[trainingForChangeIndex].exercises.push(exerciseId);
        localStorage.setItem(keys.trainings, JSON.stringify(trainingsArray));
    }
    catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}