<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonBack.svelte';
    import routes, { changeRoute, goBack, currentRouteData } from '../../../helpers/routes';
    import exercisesTypes from '../../../testData/exercisesTypes.json';
    import storage from '../../../helpers/storage/storage';

    let newExercise = $currentRouteData;

    function changeExercise() {
        if (newExercise.type && newExercise.name){
            storage.changeExercise(newExercise);
            alert("Изменено")
            goBack();
        } else {
            alert("что-то не записал")
        }
	}

    function removeExercise() {
        const removeChoice = confirm("Вы уверены?");
        if (removeChoice) {
            storage.removeExercise(newExercise);
            goBack();
        }
	}
</script>

<h1>Редактирование упражнения</h1>

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

<button class="btn btn-primary" on:click={changeExercise}>Изменить</button>
<button class="btn btn-danger" on:click={removeExercise}>Удалить</button>