import config from "../../configs/config";
import DefaultExercises from '../../../testData/exercisesDefault.json';
import random from "../../random";

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
    get, add
}

export default exercises;

const keys = {
    exercises: "exercises",
    defaultExercises: "defaultExercises",
    userExercises: "userExercises",
    userDefaultExercises: "userDefaultExercises"
}

function get(){
    if (config.useServer){
        return null;
    } else {
        return getExercisesFromLocalStorage();
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

async function getExercisesFromLocalStorage() {
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
      const exercises = localStorage.getItem(keys.userExercises);
      return joinUserAndDefaultExercises(exercises)
    } catch (error) {
      console.error(`Failed to get objects from localStorage: ${error}`);
      return [];
    }
}

function joinUserAndDefaultExercises(exercises:string) {
    const defaultExercises : exercise[] = DefaultExercises;
    try {
        let userExercisesArray : exercise[] = JSON.parse(exercises);
        return userExercisesArray ? [].concat(userExercisesArray, /*defaultExercises*/) : [];//defaultExercises;
    } catch (error) {
        console.error(`Failed to parse objects from localStorage: ${error}`);
        return [];//defaultExercises;
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