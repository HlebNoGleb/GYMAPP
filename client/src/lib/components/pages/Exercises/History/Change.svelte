<script>
// @ts-nocheck

    import { _ } from 'svelte-i18n';
    import routes, { currentRouteData, goBack } from '../../../../helpers/routes';
    import storage from '../../../../helpers/storage/storage';
    import ButtonBack from '../../../common/buttonBack.svelte';

    let newHistory = $currentRouteData;
    let date = new Date(newHistory.date).toISOString().slice(0, 16);

    function changeHistory() {
        if (newHistory && newHistory.weight && newHistory.count){
            if (date){
                newHistory.date = new Date(date).getTime();
            } else {
                newHistory.date = new Date().getTime()
            }
            storage.changeHistory(newHistory);
            goBack();
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

<h1>Изменение истории</h1>

<div class="mb-3">
    <label for="weight" class="form-label">Вес</label>
    <input type="number" bind:value={newHistory.weight} class="form-control" id="weight" placeholder="1">
</div>
<div class="mb-3">
    <label for="count" class="form-label">Кол-во</label>
    <input type="number" bind:value={newHistory.count} class="form-control" id="count" placeholder="1">
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

<button class="btn btn-primary" on:click={changeHistory}>Изменить</button>
<button class="btn btn-danger" on:click={removeHistory}>Удалить</button>