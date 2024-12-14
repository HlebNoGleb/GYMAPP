<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonsBackForward.svelte';
    import routes, { changeRoute, currentRouteData, goBack } from '../../../helpers/routes';
    import exercisesTypes from '../../../testData/exercisesTypes.json';
    import storage from '../../../helpers/storage/storage';
    import { type INewExercise, ExerciseType } from '../../../helpers/storage/Exercises/exercises';

    let newExercise:INewExercise = {
        userId: undefined,
        name: '',
        description: '',
        type: ExerciseType.repetition_weight
    }

    $: {
        console.log(newExercise)
    }

    function saveExercises() {
        console.log($currentRouteData);

        if (newExercise.type && newExercise.name){
            storage.addNewExercise(newExercise, $currentRouteData?.id);
            alert("Добавлено")
            // goBack();
        } else {
            alert("что-то не записал")
        }
	}
</script>

{#if $currentRouteData?.id}
    <h1>{$_('exercises.addExerciseToTraining')} {$currentRouteData.name}</h1>
{:else}
    <h1>{$_('exercises.addExercise')}</h1>
{/if}

<div class="mb-3">
    <label for="exerciseName" class="form-label">Название упражнения</label>
    <input type="text" bind:value={newExercise.name} class="form-control" id="exerciseName" placeholder="Deadlift">
</div>
<div class="mb-3">
    <select class="form-select" bind:value={newExercise.type}>
		{#each Object.values(ExerciseType).filter((x) => !isNaN(Number(x))) as type}
			<option value={type}>
				{$_('exercises.types.' + Object.keys(ExerciseType).filter(x => ExerciseType[x] == type))}
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