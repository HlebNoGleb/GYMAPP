import config from "../../configs/config";
import DefaultExercises from '../../../testData/exercisesDefault.json';
import random from "../../random";

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
    get, add
}

export default exercises;

const keys = {
    exercises: "exercises",
    defaultExercises: "defaultExercises",
    userExercises: "userExercises",
    userDefaultExercises: "userDefaultExercises"
}

function get(ids){
    if (config.useServer){
        return null;
    } else {
        return getUserExercisesFromLocalStorage(ids);
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
@param {Array} ids
**/
async function getUserExercisesFromLocalStorage(ids) {
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
      const allExercisesStr = localStorage.getItem(keys.userExercises);
      if (allExercisesStr) {
        const allExercises = JSON.parse(allExercisesStr);
        return filterByIds(allExercises, ids);;//joinUserAndDefaultExercises(exercises)
      }

      return [];
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