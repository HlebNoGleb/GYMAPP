<script>
        import { dayLabels, getCalendar, getMonthList, getYearsList } from "../../helpers/dateTime";
        import { createEventDispatcher, onMount } from 'svelte';

        export let selectedDate = new Date();
        export let dotsEvent = undefined;

        let date = new Date();
        let fullMonthArray = [];
        onMount(async () => {
            fullMonthArray = getCalendar(date);
            await getDots();
        })

        console.log(fullMonthArray);

        let yearList = getYearsList();
        let monthList = getMonthList();
        let selectedYear = yearList.find(x => x.current == true);
        let selectedMmonth = monthList.find(x => x.current == true);

        const dispatch = createEventDispatcher();

        async function getDots() {
            if (!dotsEvent) {
                return;
            }
            let dots = await dotsEvent(fullMonthArray[0].date, fullMonthArray[fullMonthArray.length - 1].date);
            if (dots && dots.length > 0) {
                dots.forEach(dot => {
                    fullMonthArray.find(x => x.date.setHours(0, 0, 0, 0) == dot).hasData = true
                });

                fullMonthArray = fullMonthArray;
            }
        }

        async function setDate(newDate) {
            selectedDate = newDate;
            selectedMmonth = monthList.find(x => x.value == newDate.getMonth());
            selectedYear = yearList.find(x => x.value == newDate.getFullYear());
            fullMonthArray = getCalendar(newDate);
            dispatch('setDate', newDate.setHours(0, 0, 0, 0));

            await getDots()
        }

        async function next(){
            let newDate = new Date(date.setMonth(date.getMonth() + 1));
            selectedMmonth = monthList.find(x => x.value == newDate.getMonth());
            selectedYear = yearList.find(x => x.value == newDate.getFullYear());
            fullMonthArray = getCalendar(newDate);

            await getDots()
        }

        async function prev(){
            let newDate = new Date(date.setMonth(date.getMonth() - 1));
            selectedMmonth = monthList.find(x => x.value == newDate.getMonth());
            selectedYear = yearList.find(x => x.value == newDate.getFullYear());
            fullMonthArray = getCalendar(newDate);

            await getDots()
        }

        async function changeDate(){
            let newDate = new Date(selectedYear.value, selectedMmonth.value)
            selectedMmonth = monthList.find(x => x.value == newDate.getMonth());
            selectedYear = yearList.find(x => x.value == newDate.getFullYear());
            fullMonthArray = getCalendar(newDate);

            await getDots()
        }

    </script>
    <div class="date-picker">
        <div class="date-picker-controls">
            <button class="btn btn-primary" on:click={prev}>-</button>
            <select bind:value={selectedMmonth.value} on:change={changeDate} >
                {#each monthList as month}
                    <option selected={month.value == selectedMmonth.value} value="{month.value}">{month.label}</option>
                {/each}
            </select>
            <select bind:value={selectedYear.value} on:change={changeDate} >
                {#each yearList as year}
                    <option selected={year.value == selectedYear.value} value="{year.value}">{year.label}</option>
                {/each}
            </select>
            <button class="btn btn-primary" on:click={next}>+</button>
        </div>
        <div class="month-grid">
            {#each dayLabels as day}
                <div class="day day-name">{day}</div>
            {/each}
            {#each fullMonthArray as day}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span class:has-data={day.hasData} class:today={day.today} class:selected={day.date.toDateString() == selectedDate.toDateString()} class="day day-num" class:current-month={day.currentMonth} class:weekend={day.date.getDay() == 6 || day.date.getDay() == 0} on:click={() => setDate(day.date)}>
                    <span>{day.date.getDate()}</span>
                </span>
            {/each}
        </div>
        <button class="btn btn-primary" on:click={() => setDate(new Date())}>Сегодня</button>
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
            margin-bottom: 5px;
        }

        .day{
            font-size: 0.8rem;
            height: 37px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--sub-color);
            cursor: pointer;
            position: relative;
            border-radius: 5px;
        }

        .day.has-data{
            position: relative;
        }

        .day.has-data::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 5px;
            background-color: var(--main-color);
            /* opacity: 0.5; */
            border-radius: 5px;
        }

        .day.day-num{
            background-color: var(--sub-color);
        }

        .day.day-num.current-month{
            background-color: transparent;
        }

        .day.day-num.weekend{
            /* color: var(--sub-color); */
        }

        .day.day-name{
            border: none;
            cursor: auto;
        }

        .day.today{
            color: red;
        }

        .day.day-num:hover{
            background-color: var(--main-color);
            color: var(--sub-color)!important;
            border: 1px solid var(--main-color);
        }

        .day.day-num.selected{
            background-color: var(--main-color);
            color: #fff;
        }
    </style>
