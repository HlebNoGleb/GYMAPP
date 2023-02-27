<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonBack.svelte';
    import routes, { changeRoute } from '../../../helpers/routes';
    import exercisesTypes from '../../../testData/exercisesTypes.json';

    let selected;
	let name = '';
    let description = '';

    let newExercise = {
        name: '',
        description: '',
        type: exercisesTypes[0],
    }

    function handleSubmit() {
        if (newExercise.type && newExercise.name){
            alert(`saved`);
        } else {
            alert("что-то не записал")
        }

	}
</script>

<h1>Добавление упражнения</h1>

<div class="mb-3">
    <label for="exerciseName" class="form-label">Название упражнения</label>
    <input type="text" bind:value={newExercise.name} class="form-control" id="exerciseName" placeholder="Deadlift">
</div>
<div class="mb-3">
    <select class="form-select" bind:value={newExercise.type}>
		{#each exercisesTypes as type}
			<option value={type}>
				{type.name}
			</option>
		{/each}
	</select>
    <div class="form-text">Тип упражнения</div>
</div>
<div class="mb-3">
    <label for="exerciseDescription" class="form-label">Описание упражнения</label>
    <textarea bind:value={newExercise.description} class="form-control" id="exerciseDescription" placeholder="Deadlift"></textarea>
    <div class="form-text">Опционально</div>
</div>

<ButtonBack/>

<button class="btn btn-primary" on:click={handleSubmit}>Добавить</button>