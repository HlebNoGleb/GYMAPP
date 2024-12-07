<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonBack.svelte';
    import routes, { changeRoute, currentRouteData, goBack } from '../../../helpers/routes';
    import exercisesTypes from '../../../testData/exercisesTypes.json';
    import storage from '../../../helpers/storage/storage';


    let newExercise = {
        name: '',
        description: '',
        type: exercisesTypes[0].id
    }

    function saveExercises() {
        console.log($currentRouteData);

        if (newExercise.type && newExercise.name){
            storage.addNewExercise(newExercise, $currentRouteData);
            alert("Добавлено")
            // goBack();
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
			<option value={type.id}>
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

<button class="btn btn-primary" on:click={saveExercises}>Добавить</button>