import config from "../../../configs/config";
import DefaultExercises from '../../../../testData/exercisesDefault.json';
import random from "../../../random";
import arrayHelper from "../../../array";
import {keys as exercisesKeys} from "../exercises";

export interface IBaseHistory {
    id: string,
    userId : string,
    exerciseId: number,
    date: number,
    note: string,
}

export interface IhistoryRepetitionWeight extends IBaseHistory {
    weight: number,
    count: number,
    sets: number
}

export interface IhistoryTimeDistance extends IBaseHistory {
    distance: number,
    time: number
}

export interface IhistoryTime extends IBaseHistory {
    time: number
}

export type IHistory = IhistoryRepetitionWeight | IhistoryTimeDistance | IhistoryTime;

const history = {
    get, add, change, remove, getDots
};

export default history;

const keys = {
    history: "history-",
    calendar: "calendar",
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
@param {IHistory} newHistory
**/
function add(newHistory: IHistory){
    if (config.useServer){
        return null;
    } else {
        return addNewHistoryToLocalStorage(newHistory);
    }
}

/**
@param {IHistory} newHistory
**/
function change(newHistory: IHistory){
    if (config.useServer){
        return null;
    } else {
        return changeHistoryToLocalStorage(newHistory);
    }
}

/**
@param {IHistory} newHistory
**/
function remove(newHistory: IHistory){
    if (config.useServer){
        return null;
    } else {
        return removeHistoryFromLocalStorage(newHistory);
    }
}

function getDots(dateFrom, dateTo) {
    if (config.useServer){
        return null;
    } else {
        return getDotsFromLocalstorage(dateFrom, dateTo);
    }
}


/**
 * @param {Number} exercisesId
 */
async function getHistoryFromLocalStorage(exercisesId, onlyLastHistory = false, byDate = "") {
    // await new Promise(resolve => setTimeout(resolve, 50));
    try {
        const historyKey = `${keys.history}-${exercisesId}`;
        const historyJson = localStorage.getItem(historyKey);
        const histories = arrayHelper.parseFromJson(historyJson) as IHistory[];

        const sortedHistory = await sortHistoryByDate(histories);

        // debugger

        if (!arrayHelper.hasData(sortedHistory)) {
            return [];
        }

        // debugger

        if (byDate){
            let data = sortedHistory.find(x => x.date == byDate);
            return data ? [data] : []
        }

        if (onlyLastHistory){
            let data = sortedHistory[sortedHistory.length - 1];
            return data ? [data] : []
        }

        return sortedHistory

    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}

async function sortHistoryByDate(history: IHistory[]) {
    const result = history.reduce(function(acc, obj) {

        const datetime = new Date(obj.date).setHours(0, 0, 0, 0);

        var found = acc.find(function(item) {
            return item.date === datetime;
        });

        if (found) {
            found.data.push(obj);
        } else {
            acc.push({date: datetime, data: [obj]});
        }

        return acc;
    }, []);

    return result;
}

/**
@param {IHistory} newHistory
**/

function addNewHistoryToLocalStorage(newHistory: IHistory){
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

        // addHistoryToCalendar(newHistory);

    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

/**
@param {IHistory} newHistory
**/

function changeHistoryToLocalStorage(newHistory: IHistory) {
    const id = newHistory.id;
    const historyKey = `${keys.history}-${newHistory.exerciseId}`;
    const historyString = localStorage.getItem(historyKey);
    const historyArray = historyString ? JSON.parse(historyString) : [];
    const historyForChangeIndex = historyArray.findIndex(x=>x.id === id);
    historyArray[historyForChangeIndex] = newHistory;
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
}


function removeHistoryFromLocalStorage(newHistory: IHistory) {
    const id = newHistory.id;
    const historyKey = `${keys.history}-${newHistory.exerciseId}`;
    const historyString = localStorage.getItem(historyKey);
    const historyArray = historyString ? JSON.parse(historyString) : [];
    const historyRemoveIndex = historyArray.findIndex(x=>x.id === id);
    historyArray.splice(historyRemoveIndex, 1)
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
}

async function getDotsFromLocalstorage(dateFrom, dateTo) {
    try {

        let dots = [];

        const exercises = localStorage.getItem(exercisesKeys.userExercises);
        const exercisesArray = exercises ? JSON.parse(exercises) : [];

        const exercisesIds = exercisesArray.map(x=>x.id);

        for (let i = 0; i < exercisesIds.length; i++) {
            const id = exercisesIds[i];

            const exerciseHistory = await getHistoryFromLocalStorage(id, false);

            if (!exerciseHistory) {
                continue;
            }

            exerciseHistory.forEach(history => {

                const historyDate = new Date(history.date).getTime();
                if (historyDate >= dateFrom.getTime() && historyDate <= dateTo.getTime()) {
                    // console.log(historyDate, dateFrom.getTime(), dateTo.getTime());
                    if (dots.includes(historyDate)){
                        return;
                    }

                    dots.push(historyDate);
                }
            });
        }

        // console.log(dots);

        return dots;
    } catch (error) {
        console.error(`Failed to get objects from localStorage: ${error}`);
        return [];
    }
}