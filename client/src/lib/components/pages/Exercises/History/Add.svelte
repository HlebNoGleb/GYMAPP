<script lang="ts">
    import { _, locale } from 'svelte-i18n';
    import ButtonBack from '../../../common/buttonsBackForward.svelte';
    import { currentRouteData } from "../../../../helpers/routes";
    import storage from "../../../../helpers/storage/storage";
    import { HistoryModel } from '../../../../helpers/storage/Exercises/History/history';
    import { ExerciseType } from '../../../../helpers/storage/Exercises/exercises';
    import { IntervalTimer, currentTimer } from '../../../../helpers/dateTime';
    import { get, writable } from 'svelte/store';

    let exerciseId = $currentRouteData.exercise.id;
    //console.log($currentRouteData.exercise.type);

    let date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    let newHistory = HistoryModel.create($currentRouteData.exercise.type);

    //console.log(newHistory);


    function handleSubmit() {
        //console.log(newHistory);
        if (HistoryModel.validate(newHistory, $currentRouteData.exercise.type)){
            newHistory.date = new Date(date).getTime() ?? new Date().getTime();
            newHistory.exerciseId = exerciseId;
            storage.addNewHistory(newHistory);
            alert("Добавлено")
        } else {
            alert("что-то не записал")
        }
	}

    enum TimerState {
        start = 0,
        pause = 1,
        resume = 2,
        clear = 3
    }


    // debugger
    let currentTimerStart = localStorage.getItem(`timer-${exerciseId}`);
    let currentTimerTime = (new Date().getTime() - Number(currentTimerStart ?? new Date().getTime())) / 1000;

    console.log(currentTimerStart, currentTimerTime);

    currentTimer.set(currentTimerTime);

    let timerState = currentTimerStart ? TimerState.resume : TimerState.clear;

    console.log(get(currentTimer));

    let interval = new IntervalTimer(() => {
        console.log(get(currentTimer));
        currentTimer.update(value => value + 1);
        newHistory.timer = new Date(get(currentTimer) * 1000).toISOString().slice(11, 19);
    }, 1000);

    runTimer(timerState);

    console.log(interval)

    function runTimer(state) {
        console.log(state)
        switch (state) {
            case TimerState.start:
                timerState = TimerState.start;
                interval.start();
                newHistory.timer = new Date(get(currentTimer) * 1000).toISOString().slice(11, 19);
                localStorage.setItem(`timer-${exerciseId}`, new Date().getTime().toString());
                break;
            case TimerState.pause:
                timerState = TimerState.pause;
                interval.pause();
                localStorage.setItem(`timer-${exerciseId}`, new Date(new Date().setSeconds(-get(currentTimer))).getTime().toString());
                break;
            case TimerState.resume:
                timerState = TimerState.resume;
                interval.pause();
                interval.resume();
                newHistory.timer = new Date(get(currentTimer) * 1000).toISOString().slice(11, 19);
                break;
            case TimerState.clear:
                timerState = TimerState.clear;
                interval.clear();
                currentTimer.set(0);
                newHistory.timer = new Date(get(currentTimer) * 1000).toISOString().slice(11, 19);
                localStorage.removeItem(`timer-${exerciseId}`);
                break;
        }
    }
</script>

<h1>Добавление истории {$currentRouteData.exercise.default ? $currentRouteData.exercise.name[$locale] : $currentRouteData.exercise.name}</h1>
<ButtonBack/>

{#if $currentRouteData.exercise.type == ExerciseType.repetition_weight}
<div class="mb-3">
    <label for="weight" class="form-label">Вес</label>
    <input type="number" bind:value={newHistory.weight} class="form-control" id="weight" placeholder="1">
</div>
<div class="mb-3">
    <label for="count" class="form-label">Кол-во</label>
    <input type="number" bind:value={newHistory.count} class="form-control" id="count" placeholder="1">
</div>
<div class="mb-3">
    <label for="sets" class="form-label">Подходы</label>
    <input type="number" bind:value={newHistory.sets} class="form-control" id="sets" placeholder="1">
</div>
{:else if $currentRouteData.exercise.type == ExerciseType.time_distance}
    <div class="mb-3">
        <label for="time" class="form-label">Время</label>
        <input type="number" bind:value={newHistory.time} class="form-control" id="time" placeholder="1">
        <div class="form-text">В минутах</div>
    </div>
    <div class="mb-3">
        <label for="distance" class="form-label">Дистанция</label>
        <input type="number" bind:value={newHistory.distance} class="form-control" id="distance" placeholder="1">
        <div class="form-text">В километрах</div>
    </div>
{:else if $currentRouteData.exercise.type == ExerciseType.time}
<div class="mb-3">
    <label for="time" class="form-label">Время</label>
    <input type="number" bind:value={newHistory.time} class="form-control" id="time" placeholder="1">
    <div class="form-text">В минутах</div>
</div>
{/if}
<div class="mb-3">
    <label for="date" class="form-label">Дата и время</label>
    <input type="datetime-local" bind:value={date} class="form-control" id="date" placeholder="1">
</div>
<div class="row mb-3 g-2">
    <div class="col-auto flex-fill">
        <label for="timer" class="form-label">Таймер</label>
        <input type="time" step="1" bind:value={newHistory.timer} class="form-control" id="timer" placeholder="1">
    </div>
    <div class="d-flex col-auto align-items-end justify-content-end">
        {#if timerState == TimerState.clear}
            <button class="btn btn-primary" on:click={() => runTimer(TimerState.start)}><i class="fa fa-play"></i></button>
        {:else if timerState == TimerState.start || timerState == TimerState.resume}
            <button class="btn btn-primary me-1" on:click={() => runTimer(TimerState.pause)}><i class="fa fa-pause"></i></button>
            <button class="btn btn-primary" on:click={() => runTimer(TimerState.clear)}><i class="fa fa-stop"></i></button>
        {:else if timerState == TimerState.pause}
            <button class="btn btn-primary me-1" on:click={() => runTimer(TimerState.resume)}><i class="fa fa-play"></i></button>
            <button class="btn btn-primary" on:click={() => runTimer(TimerState.clear)}><i class="fa fa-stop"></i></button>
        {/if}
    </div>
</div>

<div class="mb-3">
    <label for="note" class="form-label">Описание упражнения</label>
    <textarea bind:value={newHistory.note} class="form-control" id="note" placeholder="Изи-пизи, можно повышать"></textarea>
    <div class="form-text">Опционально</div>
</div>

<button class="btn btn-primary" on:click={handleSubmit}>Добавить</button>