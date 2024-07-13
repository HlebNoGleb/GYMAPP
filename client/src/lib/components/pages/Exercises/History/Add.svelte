<script>
    import { _ } from 'svelte-i18n';
    import { currentRouteData } from "../../../../helpers/routes";
    import ButtonBack from '../../../common/buttonBack.svelte';
    import storage from '../../../../helpers/storage/storage';

    let exerciseId = $currentRouteData;

    let newHistory = {
        count: 1,
        weight: 1,
        sets: 1,
        note: '',
        exerciseId: exerciseId,
        date: new Date().getTime()
    }

    function handleSubmit() {
        if (newHistory && newHistory.weight && newHistory.count){
            storage.addNewExerciseHistory(newHistory);
            alert(`saved`);
        } else {
            alert("что-то не записал")
        }
	}
</script>

<h1>Добавление истории</h1>

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

<button class="btn btn-primary" on:click={handleSubmit}>Добавить</button>