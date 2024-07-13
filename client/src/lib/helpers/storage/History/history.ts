import config from "../../configs/config";
import random from "../../random";

interface ihistory {
    id: string,
    exerciseId : string,
    date: string,
    sets: Number,
    weight: Number,
    count: Number
}

const history = {
    getOne, getSome, add
}

export default history;

const keys = {
    history: "history_",
}

function getOne(id){
    if (config.useServer){
        return null;
    } else {
        return getExerciseHistoryFromLocalStorage(id);
    }
}

function getSome(ids){
    if (config.useServer){
        return null;
    } else {
        return getExercisesHistoryFromLocalStorage(ids);
    }
}

function add(newHistory: ihistory){
    if (config.useServer){
        return null;
    } else {
        return addnewExercisesHistoryFromLocalStorage(newHistory);
    }
}

async function getExercisesHistoryFromLocalStorage(ids: any[]) {
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
        let historyKeys = [];
        ids.forEach(id => {
            historyKeys.push(keys.history + id);
        });

        const histories = [];

        historyKeys.forEach(key => {
            const historyStr = localStorage.getItem(key);
            if (historyStr){
                const history = JSON.parse(historyStr);
                histories.push(history);
            }
        });

        if (histories.length > 0) {
            return histories;
        }

        return [];
    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}

async function getExerciseHistoryFromLocalStorage(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
        const key = keys.history + id;
        const historyStr = localStorage.getItem(key);
        if (historyStr){
            const history = JSON.parse(historyStr);
            return history
        }

        return [];
    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}


/**
@param {ihistory} history
**/

async function addnewExercisesHistoryFromLocalStorage(newHistory){
    try {
        newHistory.id = random.generageUniqueId();
        const exerciseHistory = await getExerciseHistoryFromLocalStorage(newHistory.exerciseId);
        console.log(exerciseHistory)
        exerciseHistory.push(newHistory);
        localStorage.setItem(keys.history + newHistory.exerciseId, JSON.stringify(exerciseHistory));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}