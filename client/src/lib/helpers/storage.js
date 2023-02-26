import config from "./configs/config";
import trainingsJson from "../testData/trainings.json"
import trainingExercisesJson from "../testData/trainingExercises.json"

function getTrainings(){
    if (config.useServer){
        return getTrainingsFromServer();
    } else {
        // return getTrainingsLocalStorage();
    }
}

/**
 * @param {Array} exercises
 */
function getTrainingExercise(exercises){
    if (config.useServer){
        return getTrainingExercisesFromServer(exercises);
    } else {
        // return getTrainingsLocalStorage();
    }
}

async function getTrainingsFromServer(){
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
        await new Promise(resolve => setTimeout(resolve, 2000));
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

// function getTrainingsLocalStorage(){
//     const trainingPromise = new Promise(async (resolve, reject) => {
//         const data = localStorage.getItem("trainings");
//         if (data) {
//             const trainings = JSON.parse(data);
//             resolve(trainings);
//         } else {
//             reject("no data in localStorage")
//         }
//     }).then(data => {
//         return data;
//     }).catch(err => {
//         console.error(err);
//         return null;
//     })

//     return trainingPromise;
// }

/**
 * @param {Object} trainings
 */
// function saveTrainings(trainings){
//     if (!config.useServer || config.saveServerData){
//         return saveTrainingsOnLocalStorage(trainings);
//     } else {
//         return saveTrainingsOnServer(trainings);
//     }
// }

// function saveTrainingsOnServer(trainings){
//     // FETCH POST trainings
// }

// function saveTrainingsOnLocalStorage(trainings) {
//     const savedTrainings = localStorage.getItem("trainings");

//     if (savedTrainings){
//         const newTrainings = JSON.parse(savedTrainings);
//         newTrainings.concat(trainings);
//         localStorage.removeItem("trainings");
//         localStorage.setItem("trainings", JSON.stringify(newTrainings));
//         return;
//     }

//     localStorage.setItem("trainings", JSON.stringify(trainings));
// }

const storage = {
    getTrainings, getTrainingExercise, //saveTrainings
}

export default storage;


