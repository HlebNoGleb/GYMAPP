// import { _ } from "svelte-i18n";
import { ExerciseType } from "./storage/Exercises/exercises";
import { get } from "svelte/store";

/**
 * @param {Number} weight
 */
export function calcWeight(weight) { //, logType, curType
    return `${weight} kg`
}

export function calcCount(count) {
    return `${count} rep`
}

export function getHistoryString(history) {

    if (history.type == ExerciseType.repetition_weight) {
        return [
            {
                data: history.weight,
                unit: 'kg_small'
            },
            {
                data: history.count,
                unit: 'reps_small'
            },
        ]
    }

    if (history.type == ExerciseType.time_distance) {
        return [
            {
                data: history.distance,
                unit: 'meters_small'
            },
            {
                data: history.time,
                unit: 'seconds_small'
            },
        ]
    }

    if (history.type == ExerciseType.time) {
        return [
            {
                data: history.time,
                unit: 'seconds_small'
            },
        ]
    }
}

const historyHelper = {
    calcWeight, calcCount, getHistoryObject: getHistoryString
}

export default historyHelper