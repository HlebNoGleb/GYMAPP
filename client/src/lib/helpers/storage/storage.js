import weights from "../storage/Weights/weights"
import trainings from "../storage/Trainings/trainings";
import exercises from "../storage/Exercises/exercises";
import history from "../storage/Exercises/History/history";

// ------------- TRAININGS -------------
function getTrainings(trainingIds = [], withExercises = false){
    const trainingsArray = trainings.get(trainingIds, withExercises);
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
    return exercisesArray;
}

async function getTrainingExercises(trainingId, withLastHistory = false, byDate = ""){

    //debugger;

    let trainingIds = [];

    if (trainingId) {
        trainingIds = [trainingId];
    }

    const training = await trainings.get(trainingIds);

    console.log(training);

    if (training && training.length > 0){
        const exercisesIds = training[0].exercises;
        const exercisesArray = exercises.get(exercisesIds, withLastHistory, byDate);
        return exercisesArray;
    }

    return [];
}

function addNewExercise(newExercise, trainingId = null){
    exercises.add(newExercise, trainingId);
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
}

const storage = {
    getTrainings,
    getExercises,
    getTrainingExercises,
    getWeight,
    addNewWeight,
    changeWeight,
    removeWeight,
    addNewExercise,
    addNewTraining,
    getHistory,
    addNewHistory,
    changeHistory,
    removeHistory,
    getCalendar,
    changeExercise,
    removeExercise,
    changeTraining,
    removeTraining,
    uploadExercise,
    uploadTraining
}

export default storage;




