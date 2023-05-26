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
    get, add
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
    let test = 0;
    const result = history.reduce(function(acc, obj) {

        console.log(obj);
        const datetime = new Date(obj.date);
        const date = datetime.getTime();
        //const hour = datetime.getMinutes(); // тестовая группировка по часу (минуте, секунде) - убрать [hour] для группировке по дням
        if (!acc[date]) {
          acc[date] = []; // {} - для доп группировки нужен объект
        }
        // if (!acc[date][hour]) {
        //   acc[date][hour] = [];
        // }

        acc[date]/*[hour]*/.push(obj);
        console.log(acc);
        return acc;
    }, []);

    console.log(result);
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