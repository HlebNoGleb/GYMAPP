/**
 * @param {Array} array
 */
export function hasData(array) {
    return array && array.length > 0;
}

/**
 * @param {string} json
 */
export function parseFromJson(json) {
    try {
        return JSON.parse(json) ?? [];
    } catch (error) {
        console.log("json parse fail");
        return [];
    }
}

const arrayHelper = {
    hasData, parseFromJson
}

export default arrayHelper