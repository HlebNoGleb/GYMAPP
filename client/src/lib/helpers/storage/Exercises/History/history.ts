import config from "../../../configs/config";
import DefaultExercises from '../../../../testData/exercisesDefault.json';
import random from "../../../random";
import arrayHelper from "../../../array";
import {keys as exercisesKeys, ExerciseType} from "../exercises";

export interface IBaseHistory {
    id: string,
    userId : string,
    exerciseId: number,
    date: number,
    note: string,
    type: ExerciseType,
    timer? : string
}

export interface IhistoryRepetitionWeight extends IBaseHistory {
    weight: number,
    count: number,
    sets: number
}

export interface IhistoryTimeDistance extends IBaseHistory {
    distance: number,
}

export interface IhistoryTime extends IBaseHistory {

}

export type IHistory = IhistoryRepetitionWeight | IhistoryTimeDistance | IhistoryTime;


class HistoryRepetitionWeight implements IhistoryRepetitionWeight {
    id: string;
    userId : string;
    exerciseId: number;
    date: number;
    note: string;
    weight: number;
    count: number;
    sets: number;
    type: ExerciseType;

    constructor() {
        this.weight = undefined;
        this.count = undefined;
        this.sets = 1;
        this.note = "";
        this.type = ExerciseType.repetition_weight
    }

}

class HistoryTimeDistance implements IhistoryTimeDistance {
    id: string;
    userId : string;
    exerciseId: number;
    date: number;
    note: string;
    distance: number;
    type: ExerciseType;


    constructor() {
        this.distance = undefined;
        this.note = "";
        this.type = ExerciseType.time_distance
    }
}

class HistoryTime implements IhistoryTime {
    time: number;
    id: string;
    userId: string;
    exerciseId: number;
    date: number;
    note: string;
    type: ExerciseType;

    constructor() {
        this.note = "";
        this.type = ExerciseType.time
    }
}

export class HistoryModel implements IBaseHistory {
    id: string;
    userId : string;
    exerciseId: number;
    date: number;
    note: string;
    type: ExerciseType;

    static create(type: ExerciseType) {
        if (type == ExerciseType.repetition_weight) {
            return new HistoryRepetitionWeight();
        }

        if (type == ExerciseType.time_distance) {
            return new HistoryTimeDistance();
        }

        if (type == ExerciseType.time) {
            return new HistoryTime();
        }
    }

    static validate(history: IHistory, type: ExerciseType) {
        if (type == ExerciseType.repetition_weight) {
            if (history.weight != null && history.count != null && history.sets != null) {
                return history.weight >= 0 && history.count >= 0 && history.sets >= 0;
            }

            return false
        }

        if (type == ExerciseType.time_distance) {
            if (history.distance != null && history.time != null) {
                return history.distance >= 0 && history.time >= 0;
            }

            return false
        }

        if (type == ExerciseType.time) {
            if (history.time != null) {
                return history.time >= 0;
            }

            return false
        }
    }
}

const history = {
    get, add, change, remove, getDots, getHistoriesByXMonths
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

function getHistoriesByXMonths(months) {
    if (config.useServer){
        return null;
    } else {
        return getHistoriesByXMonthsFromLocalstorage(months);
    }
}


/**
 * @param {Number} exercisesId
 */
async function getHistoryFromLocalStorage(exercisesId, onlyLastHistory = false, byDate = 0) {
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
            let data = sortedHistory.find(x => new Date(x.date).setHours(0, 0, 0, 0) == byDate);
            return data ? [data] : []
        }

        if (onlyLastHistory){
            let data = sortedHistory[0];
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

        const datetime = obj.date;

        var found = acc.find(function(item) {
            return new Date(item.date).setHours(0, 0, 0, 0) === new Date(datetime).setHours(0, 0, 0, 0);
        });

        if (found) {
            found.data.push(obj);
        } else {
            acc.push({date: datetime, data: [obj]});
        }

        return acc;
    }, []);

    result.sort(function(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return result;
}

/**
@param {IHistory} newHistory
**/

function addNewHistoryToLocalStorage(newHistory: IHistory){
    try {
        if (newHistory.sets != undefined) {
            const setsArray = Array(newHistory.sets).fill(1)
            setsArray.forEach(set => {
                newHistory.sets = 1;
                addOneHistoryToLocalStorage(newHistory);
            });

            return;
        }

        addOneHistoryToLocalStorage(newHistory);

    } catch (error) {
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

function addOneHistoryToLocalStorage(newHistory: IHistory) {
    newHistory.id = random.generageUniqueId();
    const historyKey = `${keys.history}-${newHistory.exerciseId}`;
    const historyString = localStorage.getItem(historyKey);
    const historyArray = historyString ? JSON.parse(historyString) : [];
    historyArray.push(newHistory);
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
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

async function getHistoriesByXMonthsFromLocalstorage(numberOfMonths) {
    try {
        if (numberOfMonths == -1) {
            const firstHistory = await getFirstHistoryFromLocalStorage();
            numberOfMonths = getMonthsSinceDate(new Date(firstHistory.date)) + 1;
        }

        let histories = [];
        for (let i = 0; i < numberOfMonths; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i); // убрать, если надо помесячно
            // const date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - (i))).setDate(1)).setHours(0, 0, 0, 0));
            histories.push({year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), data: []});
        }

        // console.log(histories);

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
                const historyYear = new Date(history.date).getFullYear();
                const historyMonth = new Date(history.date).getMonth();
                const historyDay = new Date(history.date).getDate(); // убрать, если надо помесячно
                const historyIndex = histories.findIndex(x=>x.year === historyYear && x.month === historyMonth && x.day === historyDay);
                if (historyIndex !== -1) {
                    histories[historyIndex].data.push(history)
                }
            });
        }

        return histories;


    } catch (error) {

    }
}

function getMonthsSinceDate(startDate) {
    const currentDate = new Date();
    const yearsDifference = currentDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - startDate.getMonth();

    return yearsDifference * 12 + monthsDifference;
    }

async function getFirstHistoryFromLocalStorage() {

    const exercises = localStorage.getItem(exercisesKeys.userExercises);
    const exercisesArray = exercises ? JSON.parse(exercises) : [];

    const exercisesIds = exercisesArray.map(x=>x.id);

    let firstHistory = undefined;

    for (let i = 0; i < exercisesIds.length; i++) {
        const id = exercisesIds[i];

        const exerciseHistory = await getHistoryFromLocalStorage(id, false);

        if (!exerciseHistory) {
            continue;
        }

        exerciseHistory.forEach(history => {
            const historyDate = new Date(history.date).getTime();
            if (!firstHistory || historyDate < firstHistory.date) {
                firstHistory = history;
            }
        });

    }

    return firstHistory;
}