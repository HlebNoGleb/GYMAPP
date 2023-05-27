import config from "../../../configs/config";
import DefaultExercises from '../../../../testData/exercisesDefault.json';
import random from "../../../random";
import arrayHelper from "../../../array";

interface Ihistory {
    id: string,
    userId? : string,
    exerciseID: Number
    date: Number,
    weight: Number,
    count: Number,
    note: string,
    sets: Number
}

const history = {
    get, add, change, remove
};

export default history;

const keys = {
    history: "history-"
}

/**
 * @param {Number} exercisesId
 */
function get(exercisesId){
    if (config.useServer){
        return null;
    } else {
        return getHistoryFromLocalStorage(exercisesId);
    }
}

/**
@param {Ihistory} newHistory
**/
function add(newHistory: Ihistory){
    if (config.useServer){
        return null;
    } else {
        return addNewHistoryToLocalStorage(newHistory);
    }
}

/**
@param {Ihistory} newHistory
**/
function change(newHistory: Ihistory){
    if (config.useServer){
        return null;
    } else {
        return changeHistoryToLocalStorage(newHistory);
    }
}

/**
@param {Ihistory} newHistory
**/
function remove(newHistory){
    if (config.useServer){
        return null;
    } else {
        return removeHistoryFromLocalStorage(newHistory);
    }
}

/**
 * @param {Number} exercisesId
 */
async function getHistoryFromLocalStorage(exercisesId) {
    // await new Promise(resolve => setTimeout(resolve, 200));
    try {
        const historyKey = `${keys.history}-${exercisesId}`;
        const historyJson = localStorage.getItem(historyKey);
        const history = arrayHelper.parseFromJson(historyJson);


        const sortedHistory = await sortHistoryByDate(history);
        console.log(sortedHistory);

        return sortedHistory;

    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}

async function sortHistoryByDate(history) {
    const result = history.reduce(function(acc, obj) {

        const datetime = new Date(obj.date);
        const date = datetime.toLocaleDateString();

        var found = acc.find(function(item) {
            return item.date === date;
        });

        if (found) {
            found.data.push(obj);
        } else {
            acc.push({date: date, data: [obj]});
        }

        return acc;
    }, []);

    return result;
}

/**
@param {Ihistory} newHistory
**/

function addNewHistoryToLocalStorage(newHistory){
    try {
        newHistory.id = random.generageUniqueId();
        const historyKey = `${keys.history}-${newHistory.exerciseId}`;
        const historyString = localStorage.getItem(historyKey);
        const historyArray = historyString ? JSON.parse(historyString) : [];
        historyArray.push(newHistory);
        localStorage.setItem(historyKey, JSON.stringify(historyArray));
    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {Ihistory} newHistory
**/

function changeHistoryToLocalStorage(newHistory) {
    debugger;
    const id = newHistory.id;
    const historyKey = `${keys.history}-${newHistory.exerciseId}`;
    const historyString = localStorage.getItem(historyKey);
    const historyArray = historyString ? JSON.parse(historyString) : [];
    const historyForChangeIndex = historyArray.findIndex(x=>x.id === id);
    historyArray[historyForChangeIndex] = newHistory;
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
}


function removeHistoryFromLocalStorage(newHistory) {
    debugger;
    const id = newHistory.id;
    const historyKey = `${keys.history}-${newHistory.exerciseId}`;
    const historyString = localStorage.getItem(historyKey);
    const historyArray = historyString ? JSON.parse(historyString) : [];
    const historyRemoveIndex = historyArray.findIndex(x=>x.id === id);
    historyArray.splice(historyRemoveIndex, 1)
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
}