/**
 * @param {Number} weight
 */
export function calcWeight(weight) { //, logType, curType
    return `${weight} kg`
}

export function calcCount(count) {
    return `${count} rep`
}

const historyHelper = {
    calcWeight, calcCount
}

export default historyHelper