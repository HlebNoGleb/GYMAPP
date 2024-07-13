import config from "../../../configs/config";
import DefaultExercises from '../../../../testData/exercisesDefault.json';
import random from "../../../random";
import arrayHelper from "../../../array";

interface Ihistory {
    id: string,
    userId? : string,
    exerciseId: Number
    date: Number,
    weight: Number,
    count: Number,
    note: string,
    sets: Number
}

const history = {
    get, add, change, remove, getCalendar
};

export default history;

const keys = {
    history: "history-",
    calendar: "calendar"
}

/**
 * @param {Number} exercisesId
 */
function get(exercisesId, onlyLast = false, byDate = ""){
    if (config.useServer){
        return null;
    } else {
        return getHistoryFromLocalStorage(exercisesId, onlyLast, byDate);
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
function getCalendar(){
    if (config.useServer){
        return null;
    } else {
        return getCalendarExercisesFromLocalStorage();
    }
}

/**
 * @param {Number} exercisesId
 */
async function getHistoryFromLocalStorage(exercisesId, onlyLastHistory = false, byDate = "") {
    // await new Promise(resolve => setTimeout(resolve, 200));
    try {
        const historyKey = `${keys.history}-${exercisesId}`;
        const historyJson = localStorage.getItem(historyKey);
        const history = arrayHelper.parseFromJson(historyJson);

        const sortedHistory = await sortHistoryByDate(history);

        if (!arrayHelper.hasData(sortedHistory)) {
            return sortedHistory;
        }

        if (onlyLastHistory){
            return [sortedHistory[sortedHistory.length - 1]]
        }

        if (byDate){
            return [sortedHistory.find(x=>x.date == byDate)]
        }

        return sortedHistory

    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}

async function sortHistoryByDate(history) {
    const result = history.reduce(function(acc, obj) {

        const datetime = new Date(obj.date);
        const date = datetime.toJSON().split("T")[0];

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
        const setsArray = Array(newHistory.sets).fill(1)
        setsArray.forEach(set => {
            newHistory.id = random.generageUniqueId();
            newHistory.sets = 1;
            const historyKey = `${keys.history}-${newHistory.exerciseId}`;
            const historyString = localStorage.getItem(historyKey);
            const historyArray = historyString ? JSON.parse(historyString) : [];
            historyArray.push(newHistory);
            localStorage.setItem(historyKey, JSON.stringify(historyArray));
        });

        updateCalendar(newHistory);

    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {Ihistory} newHistory
**/

function changeHistoryToLocalStorage(newHistory) {
    const id = newHistory.id;
    const historyKey = `${keys.history}-${newHistory.exerciseId}`;
    const historyString = localStorage.getItem(historyKey);
    const historyArray = historyString ? JSON.parse(historyString) : [];
    const historyForChangeIndex = historyArray.findIndex(x=>x.id === id);
    historyArray[historyForChangeIndex] = newHistory;
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
}


function removeHistoryFromLocalStorage(newHistory) {
    const id = newHistory.id;
    const historyKey = `${keys.history}-${newHistory.exerciseId}`;
    const historyString = localStorage.getItem(historyKey);
    const historyArray = historyString ? JSON.parse(historyString) : [];
    const historyRemoveIndex = historyArray.findIndex(x=>x.id === id);
    historyArray.splice(historyRemoveIndex, 1)
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
}

function updateCalendar(newHistory) {
    let calendarDate = new Date(newHistory.date).toJSON().split("T")[0];
    let calendarArray = JSON.parse(localStorage.getItem(keys.calendar) || "[]");
    let currentCalendarDay = calendarArray.find(x => x.date == calendarDate);
    if (currentCalendarDay) {
        if (!currentCalendarDay.exercises.includes(newHistory.exerciseId)) {
            currentCalendarDay.exercises.push(newHistory.exerciseId);
        }
    } else {
        calendarArray.push(
            {
                date: calendarDate,
                exercises: [newHistory.exerciseId]
            }
        );
    }

    localStorage.setItem(keys.calendar, JSON.stringify(calendarArray));
}

function getCalendarExercisesFromLocalStorage() {
    //todo - доделать периоды по месяцам календаря
    return JSON.parse(localStorage.getItem(keys.calendar) || "[]");
}