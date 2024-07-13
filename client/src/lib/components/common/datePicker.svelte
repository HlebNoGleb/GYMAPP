<script>
// @ts-nocheck

        // import { dayLabels, getCalendar, getMonthList, getYearsList } from "../../helpers/dateTime";
        import { onMount } from "svelte";
        import {dayLocaleOptions, monthLocaleOptions, dayLabels, getCalendar, getMonthList, getYearsList} from "../../helpers/dateTime";
        // import {getDotsByPeriod, getDotsByFilter} from "./data/dataProvider"
        import {createEventDispatcher} from 'svelte';
    import storage from "../../helpers/storage/storage";

        let fullMonthArray = [];
        let date = new Date();
        let showDate = date.toLocaleDateString("ru-RU", dayLocaleOptions);
        let yearList = getYearsList();
        let monthList = getMonthList();
        let year = yearList.find(x => x.current == true);
        let month = monthList.find(x => x.current == true);

        let selectedYear = year.value;
        let selectedMonth = month.value;

        $: {
            year = yearList.find(year => year.value === selectedYear)
            month = monthList.find(month => month.value === selectedMonth)
        }

        onMount(() => {
            start();
        });

        function start(){
            fullMonthArray = getCalendar(date);
            getDots();
        }

        const dispatch = createEventDispatcher()

        function setDate(selectedDate) {
            selectedDate.setHours(selectedDate.getHours() - selectedDate.getTimezoneOffset() / 60);
            dispatch('setDate', selectedDate.toJSON().split("T")[0]);
            showDate = selectedDate.toLocaleDateString();
            getDots();
        }

        function next(){
            let newDate = new Date(date.setMonth(date.getMonth() + 1));
            month = monthList.find(x => x.value == newDate.getMonth());
            year = yearList.find(x => x.value == newDate.getFullYear());
            showDate = newDate.toLocaleDateString("ru-RU", monthLocaleOptions);
            fullMonthArray = getCalendar(newDate);
            // dispatch('setDate', newDate);
            getDots();
        }

        function prev(){
            let newDate = new Date(date.setMonth(date.getMonth() - 1));
            month = monthList.find(x => x.value == newDate.getMonth());
            year = yearList.find(x => x.value == newDate.getFullYear());
            showDate = newDate.toLocaleDateString("ru-RU", monthLocaleOptions);
            fullMonthArray = getCalendar(newDate);
            // dispatch('setDate', newDate);
            getDots();
        }

        function changeDate(){
            console.log("change")
            let newDate = new Date(year.value, month.value)
            month = monthList.find(x => x.value == newDate.getMonth());
            year = yearList.find(x => x.value == newDate.getFullYear());
            showDate = newDate.toLocaleDateString("ru-RU", monthLocaleOptions);
            fullMonthArray = getCalendar(newDate);
            // dispatch('setDate', newDate);
            getDots();
        }

        async function getDots() {

            let calendar = await storage.getCalendar();
            let data = calendar.map(x=>x.date);

            if (data && data.length > 0){
                fullMonthArray.forEach(element => {
                    element["hasData"] = [];
                    let date = new Date(element["date"]);
                    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
                    let hasData = data.find(o => o ===  date.toJSON().split("T")[0]);
                    element["hasData"] = hasData ? true : false;
                });
            }

            fullMonthArray = fullMonthArray;
        }

    </script>
    <div class="date-picker">
        <span class="date-changer-locale-date mb-1">{showDate}</span>
        <div class="date-picker-controls">
            <button class="btn btn-outline-dark" on:click={prev}>-</button>
            <select bind:value={selectedMonth} on:change={changeDate}>
                {#each monthList as month}
                    <option selected value="{month.value}">{month.label}</option>
                {/each}
            </select>
            <select bind:value={selectedYear} on:change={changeDate} >
                {#each yearList as year}
                        <option selected value="{year.value}">{year.label}</option>
                {/each}
            </select>
            <button class="btn btn-outline-dark" on:click={next}>+</button>
        </div>
        <div class="month-grid">
            {#each dayLabels as day}
                <div class="day day-name">{day}</div>
            {/each}
            {#each fullMonthArray as day}
                <span class:today={day.today} class="day day-num" class:current-month={day.currentMonth} class:weekend={day.date.getDay() == 6 || day.date.getDay() == 0} on:click={() => setDate(day.date)}>
                    <span>{day.date.getDate()}</span>
                    {#if day.hasData}
                        <span class="day-num-has-data">.</span>
                    {/if}
                </span>
            {/each}
        </div>

    </div>

    <style>
        .date-picker{
            display: flex;
            flex-direction: column;
        }
        .date-picker-controls{
            display: grid;
            grid-template-columns: 40px 110px 90px 40px;
            grid-template-rows: 1fr;
            grid-gap: 5px;
            margin-bottom: 5px;
        }
        .month-grid{
            display: grid;
            grid-template-columns: repeat(7, 38px);
            grid-gap: 5px;
        }

        .day{
            font-size: 0.8rem;
            height: 37px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ccc;
            cursor: pointer;
            position: relative;
        }

        .day.day-num{
            background-color: #ccc
        }

        .day.day-num.current-month{
            background-color: transparent;
        }

        .day.day-num.weekend{
            color: #aaa;
        }

        .day.day-name{
            border: none;
            cursor: auto;
        }

        .day-num-has-data{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 22px;
            font-size: 25px;
            font-weight: bold;
            color: blue;
            line-height: 1px;
        }

        .day.today{
            color: red
        }
    </style>
