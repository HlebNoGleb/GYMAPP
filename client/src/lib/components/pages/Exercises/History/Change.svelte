<script>
// @ts-nocheck

    import { _ } from 'svelte-i18n';
    import routes, { currentRouteData } from '../../../../helpers/routes';
    import ButtonBack from '../../../common/buttonBack.svelte';

    let newHistory = $currentRouteData;

    function handleSubmit() {
        if (newHistory && newHistory.weight && newHistory.count){
            alert(`saved`);
        } else {
            alert("что-то не записал")
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
    <label for="note" class="form-label">Описание упражнения</label>
    <textarea bind:value={newHistory.note} class="form-control" id="note" placeholder="Изи-пизи, можно повышать"></textarea>
    <div class="form-text">Опционально</div>
</div>

<ButtonBack/>

<button class="btn btn-primary" on:click={handleSubmit}>Изменить</button>