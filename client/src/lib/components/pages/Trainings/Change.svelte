<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonsBackForward.svelte';
    import storage from '../../../helpers/storage/storage';
    import routes, { changeRoute, goBack, currentRouteData } from '../../../helpers/routes';


    //console.log($currentRouteData);

    let exercisesPromise = storage.getExercises([]);
    let trainingName = $currentRouteData.name;
    let selection = $currentRouteData.exercises;

    function saveTraining() {
        if (trainingName && selection.length > 0){
            let training = $currentRouteData;
            training.name = trainingName;
            training.exercises = selection;
            storage.changeTraining(training);
            alert("Изменено")
            goBack();
        } else {
            alert("что-то не записал")
        }
	}

    function removeTraining() {
        const removeChoice = confirm("Вы уверены?");
        if (removeChoice) {
            storage.removeTraining($currentRouteData.id);
            goBack();
        }
	}

</script>

<h1>{$_('trainings.changeTitle')} {trainingName}</h1>

<ButtonBack/>
<button class="btn btn-primary" on:click={saveTraining}>Сохранить</button>
<button class="btn btn-danger" on:click={removeTraining}>Удалить</button>

<div class="mb-3 mt-3">
    <label for="exampleInputEmail1" class="form-label">Название тренировки</label>
    <input type="email" bind:value={trainingName} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Будет использоваться для обозначения тренировки</div>
  </div>

{#await exercisesPromise}
    <p>loading...</p>
{:then exercises}
    {#each exercises as exercise}
    <div class="list-group" >
        <div class="accordion-item mb-2">
            <li class="list-group-item">
                <input class="form-check-input me-1" type="checkbox" id="exercise-{exercise.id}" value={exercise.id} bind:group={selection}>
                <label class="form-check-label stretched-link" for="exercise-{exercise.id}">{exercise.name}</label>
                {#if exercise.description}
                    <div class="position-absolute check-info" data-bs-toggle="collapse" data-bs-target="#collapse-{exercise.id}">
                        <span class="badge bg-secondary">Check info</span>
                    </div>
                {/if}
            </li>
            {#if exercise.description}
                <div id="collapse-{exercise.id}" class="accordion-collapse collapse">
                    <div class="accordion-body p-2">
                        <strong>{@html exercise.description}</strong>
                    </div>
                </div>
            {/if}
        </div>
    </div>
    {/each}
{/await}

<button class="btn btn-primary rounded-circle add-button" on:click={() => changeRoute(routes.exercisesAddNew, undefined)}>+</button>

<style>
    .check-info{
        z-index: 2;
        right: 10px;
        cursor: pointer;
        height: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
<!--
    Название тренировки
    Выбрать упражнение из стандартных и своих
    Добавить свое упражнение
-->