<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonBack.svelte';
    import routes, { goBack } from '../../../helpers/routes';

    let newWeight = {
        weight: '',
        measure: 1,
        date: new Date().getTime(),
    }

    function handleSubmit() {
        if (newWeight && newWeight.weight){
            console.log(newWeight);
            alert(`saved`);
            goBack();
        } else {
            alert("что-то не записал")
        }

	}
</script>

<h1>Добавление веса</h1>

<div class="mb-3">
    <label for="exerciseName" class="form-label">Значение веса</label>
    <input type="number" bind:value={newWeight.weight} class="form-control" id="exerciseName" placeholder="90">
</div>
<div class="mb-3">
    <select class="form-select" bind:value={newWeight.measure}>
        <option value={1}>kg</option>
        <option value={2}>lbs</option>
	</select>
</div>

<ButtonBack/>

<button class="btn btn-primary" on:click={handleSubmit}>Добавить</button>