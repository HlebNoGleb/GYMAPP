/**
 * @param {Number} date
 */
export function calcAgo(date) {
    let dateStart = new Date(date * 1000);
    let now = new Date();
    const diffTime = Math.abs(dateStart - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    // console.log(dateStart, now);
    return `${diffDays} days ago`
}

const dateTimeHelper = {
    calcAgo,
}

export default dateTimeHelper