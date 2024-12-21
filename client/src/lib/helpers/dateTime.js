import { writable } from "svelte/store";
/**
 * @param {Number} date
 */
export function calcAgo(date) {
    if (!date) {
        return ""
    }
    let dateStart = new Date(date);
    let now = new Date();
    const diffTime = Math.abs(dateStart - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} days ago`
}

export function getDayName(date) {
    const dateObj = new Date(date);
    const options = {
        weekday: 'long'
    }; // или 'short' для короткого названия
    return new Intl.DateTimeFormat('ru-RU', options).format(dateObj);
}

const dateTimeHelper = {
    calcAgo,
    getDayName
}

export default dateTimeHelper

export function getCalendar(date) {
    let year = date.getFullYear();
    let month = date.getMonth();

    if (++month > 11) {
        month = 0;
        year++;
    }

    if (--month < 0) {
        month = 11;
        year--;
    }

    let prevMonthDaysCount = new Date(year, month, 0).getDate();
    let prevMonthLastDay = new Date(year, month - 1, prevMonthDaysCount).getDay();

    let currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
    let currentMonthLastDay = new Date(year, month, currentMonthDaysCount).getDay();

    let prevMonthDateArray = [];
    let currentMonthDateArray = [];
    let nextMonthDateArray = [];

    for (let index = prevMonthDaysCount; index > prevMonthDaysCount - prevMonthLastDay; index--) {
        let date = new Date(year, month - 1, index);
        let day = createDay(date)
        prevMonthDateArray.push(day);
    }

    prevMonthDateArray = prevMonthDateArray.reverse();

    for (let index = 1; index < currentMonthDaysCount + 1; index++) {
        let date = new Date(year, month, index);
        let day = createDay(date, true)
        currentMonthDateArray.push(day);
    }

    for (let index = 1; index <= 7 - currentMonthLastDay; index++) {
        let date = new Date(year, month + 1, index);
        let day = createDay(date)
        nextMonthDateArray.push(day);
    }

    return [...prevMonthDateArray, ...currentMonthDateArray, ...nextMonthDateArray];
}

function createDay(date, currentMonth = false) {
    let day = {
        date: date,
    }
    let today = isToday(date);

    if (today) {
        day.today = true;
    }

    if (currentMonth) {
        day.currentMonth = true;
    }

    return day;
}

export function isToday(date) {
    return date.toJSON() == new Date(new Date().setHours(0, 0, 0, 0)).toJSON()
}

export let dayLocaleOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
export let monthLocaleOptions = {
    year: 'numeric',
    month: 'long'
};
export let dayLabels = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export let getMonthList = () => {
    let months = [{
            value: 0,
            label: "Январь"
        },
        {
            value: 1,
            label: "Февраль"
        },
        {
            value: 2,
            label: "Март"
        },
        {
            value: 3,
            label: "Апрель"
        },
        {
            value: 4,
            label: "Май"
        },
        {
            value: 5,
            label: "Июнь"
        },
        {
            value: 6,
            label: "Июль"
        },
        {
            value: 7,
            label: "Август"
        },
        {
            value: 8,
            label: "Сентябрь"
        },
        {
            value: 9,
            label: "Октябрь"
        },
        {
            value: 10,
            label: "Ноябрь"
        },
        {
            value: 11,
            label: "Декабрь"
        }
    ];

    months = months.map(month => {
        if (month.value === new Date().getMonth()) {
            return {
                ...month,
                current: true
            };
        }

        return month;
    });

    return months;
}

export let getYearsList = () => {
    let yearList = [];
    for (let index = 2000; index < 2050; index++) {
        yearList.push({
            value: index,
            label: index
        });
    }

    yearList = yearList.map(year => {
        if (year.value === new Date().getFullYear()) {
            return {
                ...year,
                current: true
            };
        }

        return year;
    });


    return yearList;
}

export class IntervalTimer {
    callbackStartTime;
    remaining = 0;
    paused = false;
    timerId = null;
    _callback;
    _delay;

    constructor(callback, delay) {
        this._callback = callback;
        this._delay = delay;
    }

    pause() {
        if (!this.paused) {
            this.clear();
            this.remaining = new Date().getTime() - this.callbackStartTime;
            this.paused = true;
        }
    }

    resume() {
        if (this.paused) {
            if (this.remaining) {
                setTimeout(() => {
                    this.run();
                    this.paused = false;
                    this.start();
                }, this.remaining);
            } else {
                this.paused = false;
                this.start();
            }
        }
    }

    clear() {
        clearInterval(this.timerId);
    }

    start() {
        this.clear();
        this.timerId = setInterval(() => {
            this.run();
        }, this._delay);
    }

    run() {
        this.callbackStartTime = new Date().getTime();
        this._callback();
    }
}

export let currentTimer = writable(0);