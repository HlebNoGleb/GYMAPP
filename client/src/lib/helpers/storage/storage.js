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
function getExercises(exercisesIds, withLastHistory = false){
    console.log(withLastHistory);
    const exercisesArray = exercises.get(exercisesIds, withLastHistory);
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


function removeHistory(newHistory){
    history.remove(newHistory);
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
    changeExercise,
    removeExercise,
    changeTraining,
    removeTraining,
    uploadExercise,
    uploadTraining
}

export default storage;




