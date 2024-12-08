<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRouteData, goBack } from '../../../helpers/routes';
    import storage from '../../../helpers/storage/storage';
    import ButtonBack from '../../common/buttonsBackForward.svelte';

    let currentWeight = $currentRouteData;
    let date = new Date(currentWeight.date).toISOString().slice(0, 16);


    function changeWeight() {
        if (currentWeight && currentWeight.weight && currentWeight.measure) {
            if (date){
                currentWeight.date = new Date(date).getTime();
            } else {
                currentWeight.date = new Date().getTime()
            }
            storage.changeWeight(currentWeight);
            goBack();
        }
    }

    function removeWeight() {
        const removeChoice = confirm("Вы уверены?");
        if (removeChoice) {
            storage.removeWeight(currentWeight);
            goBack();
        }
    }
</script>

<h1>Изменение веса</h1>

<div class="mb-3">
    <label for="weightName" class="form-label">Значение веса</label>
    <input type="number" bind:value={currentWeight.weight} class="form-control" id="exerciseName" placeholder="90">
</div>
<div class="mb-3">
    <select class="form-select" bind:value={currentWeight.measure}>
        <option value={1}>kg</option>
        <option value={2}>lbs</option>
	</select>
</div>
<div class="mb-3">
    <label for="sets" class="form-label">Дата и время</label>
    <input type="datetime-local" bind:value={date} class="form-control" id="date" placeholder="1">
</div>

<ButtonBack/>

<button class="btn btn-primary" on:click={changeWeight}>Изменить</button>
<button class="btn btn-danger" on:click={removeWeight}>Удалить</button>