import config from "../../configs/config";
import trainingsJson from "../../../testData/trainings.json"
import random from "../../random";

interface iTraining {
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
        return [];
    } else {
        return getTrainingsFromLocalStorage();//getTrainingsLocalStorage();
    }
}
/**
@param {iTraining} newTraining
**/
function add(newTraining: iTraining){
    console.log(newTraining);
    if (config.useServer){
        return null;
    } else {
        return addNewTrainingToLocalStorage(newTraining)//getTrainingsLocalStorage();
    }
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