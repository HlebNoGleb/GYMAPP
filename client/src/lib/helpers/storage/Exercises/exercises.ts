import config from "../../configs/config";
import DefaultExercises from '../../../testData/exercisesDefault.json';
import random from "../../random";
import arrayHelper from "../../array";
import trainings from "../Trainings/trainings";
import history from "./History/history";

enum exerciseType {
    WeightCount,
    TimeDistanse,
    Time,
}

interface iexercise {
    id: string,
    userId? : string,
    name: string,
    description: string,
    type: exerciseType
}

const exercises = {
    get, add, change, remove, upload
}

export default exercises;

const keys = {
    exercises: "exercises",
    defaultExercises: "defaultExercises",
    userExercises: "userExercises",
    userDefaultExercises: "userDefaultExercises"
}

/**
 * @param {Array} exercisesIds
 */
function get(exercisesIds, withLastHistory = false, byDate = ""){
    console.log(withLastHistory);
    if (config.useServer){
        return null;
    } else {
        return getExercisesFromLocalStorage();
    }
}

/**
@param {iexercise} exercise
**/
function add(exercise: iexercise){
    if (config.useServer){
        return null;
    } else {
        return addNewUserExerciseToLocalStorage(exercise);
    }
}

/**
@param {exercise} exercise
**/
function upload(exercise: exercise){
    if (config.useServer){
        return null;
    } else {
        return uploadNewExerciseToLocalStorage(exercise);
    }
}


/**
@param {exercise} exercise
**/
function change(exercise: exercise){
    if (config.useServer){
        return null;
    } else {
        return changeExerciseInLocalStorage(exercise);
    }
}


/**
@param {exercise} exercise
**/
function remove(exercise: exercise){
    if (config.useServer){
        return null;
    } else {
        return removeExerciseFromLocalStorage(exercise);
    }
}

/**
 * @param {Array} exercisesIds
 */
async function getExercisesFromLocalStorage(exercisesIds, withLastHistory = false, byDate = "") {
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
        const exercisesJson = localStorage.getItem(keys.userExercises);
        const allExercises = arrayHelper.parseFromJson(exercisesJson);
        if (arrayHelper.hasData(exercisesIds)) {
            const filteredExercises = allExercises.filter(obj => exercisesIds.includes(obj.id));

            if (withLastHistory || byDate) {
                for (const exercise of filteredExercises) {
                    exercise.lastHistory = await history.get(exercise.id, withLastHistory, byDate);
                }
            }

            return filteredExercises;
        }

        if (withLastHistory || byDate) {
            for (const exercise of allExercises) {
                exercise.lastHistory = await history.get(exercise.id, withLastHistory, byDate);
            }
        }

        return allExercises;

    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}

function filterByIds(allExercises, ids) {
    if (!ids) {
        return allExercises;
    }

    return allExercises.filter(x=> ids.includes(x.id));
}

// function joinUserAndDefaultExercises(exercises:string) {
//     const defaultExercises : exercise[] = DefaultExercises;
//     try {
//         let userExercisesArray : exercise[] = JSON.parse(exercises);
//         return userExercisesArray ? [].concat(userExercisesArray, /*defaultExercises*/) : [];//defaultExercises;
//     } catch (error) {
//         console.error(`Failed to parse objects from localStorage: ${error}`);
//         return [];//defaultExercises;
//     }
// }

/**
@param {iexercise} exercise
**/

function addNewUserExerciseToLocalStorage(exercise){
    try {
        exercise.id = random.generageUniqueId();
        const exercises = localStorage.getItem(keys.userExercises);
        const exercisesArray = exercises ? JSON.parse(exercises) : [];
        exercisesArray.push(exercise);
        localStorage.setItem(keys.userExercises, JSON.stringify(exercisesArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {exercise} exercise
**/

async function uploadNewExerciseToLocalStorage(exercise){
    try {
        await new Promise(resolve => setTimeout(resolve, 200));
        exercise.id = random.generageUniqueId();
        const exercises = localStorage.getItem(keys.userExercises);
        const exercisesArray = exercises ? JSON.parse(exercises) : [];
        exercisesArray.push(exercise);
        localStorage.setItem(keys.userExercises, JSON.stringify(exercisesArray));
        return exercise;
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {exercise} exercise
**/

function changeExerciseInLocalStorage(exercise){
    try {
        const id = exercise.id;
        const exercises = localStorage.getItem(keys.userExercises);
        const exercisesArray = exercises ? JSON.parse(exercises) : [];
        const exerciseForChangeIndex = exercisesArray.findIndex(x=>x.id === id);
        exercisesArray[exerciseForChangeIndex] = exercise;
        localStorage.setItem(keys.userExercises, JSON.stringify(exercisesArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {exercise} exercise
**/

function removeExerciseFromLocalStorage(exercise: exercise): void{
    try {
        const id = exercise.id;
        const exercises = localStorage.getItem(keys.userExercises);
        const exercisesArray = exercises ? JSON.parse(exercises) : [];
        const exerciseRemoveIndex = exercisesArray.findIndex(x=>x.id === id);
        exercisesArray.splice(exerciseRemoveIndex, 1);
        localStorage.setItem(keys.userExercises, JSON.stringify(exercisesArray));

        //also remove exercise from training
        const trainingsKey = trainings.keys.trainings;
        const trainingsString = localStorage.getItem(trainingsKey);
        const trainingsArray = trainingsString ? JSON.parse(trainingsString) : [];

        trainingsArray.forEach(training => {
            training.exercises = training.exercises.filter(e => e !== id);
        });

        localStorage.setItem(trainingsKey, JSON.stringify(trainingsArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}