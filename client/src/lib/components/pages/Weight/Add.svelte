<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonBack.svelte';
    import storage from '../../../helpers/storage/storage';
    import routes, { goBack } from '../../../helpers/routes';

    let date = new Date().toISOString().slice(0, 16);

    let newWeight = {
        weight: '',
        measure: 1,
        date: null
    }

    function handleSubmit() {
        if (newWeight && newWeight.weight){

            if (date){
                newWeight.date = new Date(date);
            } else {
                newWeight.date = new Date()
            }

            storage.addNewWeight(newWeight);
            alert(`saved`);
            goBack();
        } else {
            alert("что-то не записал")
        }

	}
</script>

<h1>Добавление веса</h1>

<div class="mb-3">
    <label for="weightName" class="form-label">Значение веса</label>
    <input type="number" bind:value={newWeight.weight} class="form-control" id="exerciseName" placeholder="90">
</div>
<div class="mb-3">
    <select class="form-select" bind:value={newWeight.measure}>
        <option value={1}>kg</option>
        <option value={2}>lbs</option>
	</select>
</div>
<div class="mb-3">
    <label for="sets" class="form-label">Дата и время</label>
    <input type="datetime-local" bind:value={date} class="form-control" id="date" placeholder="1">
</div>

<ButtonBack/>

<button class="btn btn-primary" on:click={handleSubmit}>Добавить</button>