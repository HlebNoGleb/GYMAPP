import config from "../../configs/config";
import DefaultExercises from '../../../testData/exercisesDefault.json';
import random from "../../random";
import arrayHelper from "../../array";
import trainings from "../Trainings/trainings";
import history from "./History/history";

export enum ExerciseType {
    repetition_weight = "1",
    time_distance = "2",
    time = "3"
}

export interface INewExercise {
    userId? : string,
    name: string,
    description: string,
    type: ExerciseType,
}

export interface IExercise extends INewExercise {
    history: Array<any>,
    id: string,
    userId? : string,
    name: string,
    description: string,
    type: ExerciseType,
}


interface IExerciseGetParams {
    ids: Array<string>,
    withLastHistory: boolean,
    byDate: string,
    onlyWithHistory: boolean
}

const exercises = {
    get, add, change, remove, upload
}

export default exercises;

export const keys = {
    exercises: "exercises",
    defaultExercises: "defaultExercises",
    userExercises: "userExercises",
    userDefaultExercises: "userDefaultExercises"
}

/**
 * @param {Array} exercisesIds
 */
function get(params: IExerciseGetParams){
    // console.log(withLastHistory);
    if (config.useServer){
        return null;
    } else {
        return getExercisesFromLocalStorage(params);
    }
}

/**
@param {IExercise} exercise
@param {Number} trainingId
**/
function add(exercise: IExercise, trainingId = null){
    if (config.useServer){
        return null;
    } else {
        return addNewExerciseToLocalStorage(exercise, trainingId);
    }
}

/**
@param {IExercise} exercise
**/
function upload(exercise: IExercise){
    if (config.useServer){
        return null;
    } else {
        return uploadNewExerciseToLocalStorage(exercise);
    }
}


/**
@param {IExercise} exercise
**/
function change(exercise: IExercise){
    if (config.useServer){
        return null;
    } else {
        return changeExerciseInLocalStorage(exercise);
    }
}


/**
@param {IExercise} exercise
**/
function remove(exercise: IExercise){
    if (config.useServer){
        return null;
    } else {
        return removeExerciseFromLocalStorage(exercise);
    }
}

/**
 * @param {Array} exercisesIds
 */
async function getExercisesFromLocalStorage(params: IExerciseGetParams) {
    await new Promise(resolve => setTimeout(resolve, 50));
    try {
        const exercisesJson = localStorage.getItem(keys.userExercises);
        let allExercises = arrayHelper.parseFromJson(exercisesJson);
        if (arrayHelper.hasData(params.ids)) {
            let filteredExercises = allExercises.filter(obj => params.ids.includes(obj.id));

            filteredExercises = await getExercisesHistory(params.withLastHistory, params.byDate, filteredExercises);

            if (params.onlyWithHistory) {
                filteredExercises = filteredExercises.filter(obj => arrayHelper.hasData(obj.history));
            }

            return filteredExercises;
        }

        allExercises = await getExercisesHistory(params.withLastHistory, params.byDate, allExercises);

        // debugger
        if (params.onlyWithHistory) {
            allExercises = allExercises.filter(obj => arrayHelper.hasData(obj.history));
        }

        return allExercises;

    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}

async function getExercisesHistory(withLastHistory: boolean, byDate: string, exercises: Array<IExercise>) {
    if (withLastHistory || byDate) {
        for (const exercise of exercises) {
            if (withLastHistory) {
                let lastHistory = await history.get(exercise.id, withLastHistory, byDate);
                exercise.history = lastHistory;
            }

            if (byDate) {
                let dateHistory = await history.get(exercise.id, false, byDate);
                exercise.history = dateHistory;
            }
        }
    }

    return exercises;
}

/**
@param {IExercise} exercise
**/

function addNewExerciseToLocalStorage(exercise, trainingId = null){
    try {
        exercise.id = random.generageUniqueId();
        delete exercise.lastHistory;
        delete exercise.dateHistory;
        const exercises = localStorage.getItem(keys.userExercises);
        const exercisesArray = exercises ? JSON.parse(exercises) : [];
        exercisesArray.push(exercise);
        localStorage.setItem(keys.userExercises, JSON.stringify(exercisesArray));
        if (trainingId) {
            trainings.addExerciseToTraining(trainingId, exercise.id);
        }
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {IExercise} exercise
**/

async function uploadNewExerciseToLocalStorage(exercise){
    try {
        await new Promise(resolve => setTimeout(resolve, 50));
        exercise.id = random.generageUniqueId();
        delete exercise.lastHistory;
        delete exercise.dateHistory;
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
@param {IExercise} exercise
**/

function changeExerciseInLocalStorage(exercise){
    try {
        const id = exercise.id;
        const exercises = localStorage.getItem(keys.userExercises);
        delete exercise.lastHistory;
        delete exercise.dateHistory;
        const exercisesArray = exercises ? JSON.parse(exercises) : [];
        const exerciseForChangeIndex = exercisesArray.findIndex(x=>x.id === id);
        exercisesArray[exerciseForChangeIndex] = exercise;
        localStorage.setItem(keys.userExercises, JSON.stringify(exercisesArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {IExercise} exercise
**/

function removeExerciseFromLocalStorage(exercise: IExercise): void{
    try {
        const id = exercise.id;
        const exercises = localStorage.getItem(keys.userExercises);
        const exercisesArray = exercises ? JSON.parse(exercises) : [];
        const exerciseRemoveIndex = exercisesArray.findIndex(x=>x.id === id);
        exercisesArray.splice(exerciseRemoveIndex, 1);
        localStorage.setItem(keys.userExercises, JSON.stringify(exercisesArray));

        //also remove exercise from trainings
        const trainingsKey = trainings.keys.trainings;
        const trainingsString = localStorage.getItem(trainingsKey);
        const trainingsArray = trainingsString ? JSON.parse(trainingsString) : [];

        trainingsArray.forEach(training => {
            training.exercises = training.exercises.filter(e => e !== id);
        });

        localStorage.setItem(trainingsKey, JSON.stringify(trainingsArray));

        // todo - alse remove history
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}