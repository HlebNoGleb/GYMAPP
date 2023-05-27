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

const dateTimeHelper = {
    calcAgo,
}

export default dateTimeHelper