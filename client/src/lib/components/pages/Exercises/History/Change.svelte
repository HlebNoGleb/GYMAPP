<script>
// @ts-nocheck

    import { _ } from 'svelte-i18n';
    import routes, { currentRouteData, goBack } from '../../../../helpers/routes';
    import storage from '../../../../helpers/storage/storage';
    import ButtonBack from '../../../common/buttonsBackForward.svelte';
    import { HistoryModel } from '../../../../helpers/storage/Exercises/History/history';
    import { ExerciseType } from '../../../../helpers/storage/Exercises/exercises';

    let newHistory = $currentRouteData.history;
    let date = new Date(new Date(newHistory.date) - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    function changeHistory() {
        if (HistoryModel.validate(newHistory, $currentRouteData.exercise.type)){
            newHistory.date = new Date(date).getTime();
            storage.changeHistory(newHistory);
            goBack();
            // console.log(newHistory);
        } else {
            alert("что-то не записал");
        }
	}

    function removeHistory() {
        const removeChoice = confirm("Вы уверены?");
        if (removeChoice) {
            storage.removeHistory(newHistory);
            goBack();
        }
	}
</script>

<h1>Изменение истории {$currentRouteData.exercise.name}</h1>

{#if $currentRouteData.exercise.type == ExerciseType.repetition_weight}
<div class="mb-3">
    <label for="weight" class="form-label">Вес</label>
    <input type="number" bind:value={newHistory.weight} class="form-control" id="weight" placeholder="1">
</div>
<div class="mb-3">
    <label for="count" class="form-label">Кол-во</label>
    <input type="number" bind:value={newHistory.count} class="form-control" id="count" placeholder="1">
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
    <label for="sets" class="form-label">Дата и время</label>
    <input type="datetime-local" bind:value={date} class="form-control" id="date" placeholder="1">
</div>
<div class="mb-3">
    <label for="note" class="form-label">Описание упражнения</label>
    <textarea bind:value={newHistory.note} class="form-control" id="note" placeholder="Изи-пизи, можно повышать"></textarea>
    <div class="form-text">Опционально</div>
</div>

<ButtonBack/>

<button class="btn btn-primary" on:click={changeHistory}>Изменить</button>
<button class="btn btn-danger" on:click={removeHistory}>Удалить</button>