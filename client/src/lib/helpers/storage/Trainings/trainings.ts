import config from "../../configs/config";
import trainingsJson from "../../../testData/trainings.json"
import random from "../../random";

interface Training {
    id: string
    userId?: string,
    name: string,
    dates?: {
        lastTrainingDate: number,
        createDate: number
    },
    exercises: number[]
}

const trainings = {
    get, add
}

const keys = {
    trainings: "trainings"
}

export default trainings

function get(){
    if (config.useServer){
        return getTrainingsFromServer();
    } else {
        return getTrainingsFromLocalStorage();//getTrainingsLocalStorage();
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


function getTrainingsFromLocalStorage() {
    try {
      const objects = localStorage.getItem(keys.trainings);
      return objects ? JSON.parse(objects) : [];
    } catch (error) {
      console.error(`Failed to get objects from localStorage: ${error}`);
      return [];
    }
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