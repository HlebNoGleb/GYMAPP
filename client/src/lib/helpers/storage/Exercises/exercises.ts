import config from "../../configs/config";
import DefaultExercises from '../../../testData/exercisesDefault.json';
import random from "../../random";
import arrayHelper from "../../array";
import trainings from "../Trainings/trainings";

enum exerciseType {
    WeightCount,
    TimeDistanse,
    Time,
}

interface exercise {
    id: string,
    userId? : string,
    name: string,
    description: string,
    type: exerciseType
}

const exercises = {
    get, add, change, remove
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
function get(exercisesIds){
    if (config.useServer){
        return null;
    } else {
        return getExercisesFromLocalStorage(exercisesIds);
    }
}

/**
@param {exercise} exercise
**/
function add(exercise: exercise){
    if (config.useServer){
        return null;
    } else {
        return addNewExerciseToLocalStorage(exercise);
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
async function getExercisesFromLocalStorage(exercisesIds) {
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
        const exercisesJson = localStorage.getItem(keys.userExercises);
        const allExercises = arrayHelper.parseFromJson(exercisesJson);
        if (arrayHelper.hasData(exercisesIds)) {
            const filteredExercises = allExercises.filter(obj => exercisesIds.includes(obj.id));
            return filteredExercises;
        }

        return allExercises;

    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}

/**
@param {exercise} exercise
**/

function addNewExerciseToLocalStorage(exercise){
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
        debugger;
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