// @ts-nocheck
/**
 * @param {Number} date
 */
export function calcAgo(date) {
    if (!date){
        return ""
    }
    let dateStart = new Date(date);
    let now = new Date();
    const diffTime = Math.abs(dateStart - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} days ago`
}

export function getDayName(date){
    console.log(date);
    const dateObj = new Date(date);
    console.log(dateObj);
    const options = { weekday: 'long'}; // или 'short' для короткого названия
    return new Intl.DateTimeFormat('ru-RU', options).format(dateObj);
}

const dateTimeHelper = {
    calcAgo, getDayName
}

export default dateTimeHelper