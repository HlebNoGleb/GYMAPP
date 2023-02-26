<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonBack.svelte';
    import DefaultExercises from '../../../testData/exercisesDefault.json';
    import UserExercises from '../../../testData/exercisesUser.json';
    import routes, { changeRoute } from '../../../helpers/routes';

    let selection = [];

    $:{
        console.log(selection);
    }

    let exercises = [].concat(UserExercises, DefaultExercises);
    console.log(exercises);
</script>

<h1>{$_('trainings.addTitle')}</h1>

<ButtonBack/>
<button class="btn btn-primary" on:click={() => changeRoute(routes.trainingsGrid, null)}>Сохранить</button>

<div class="mb-3 mt-3">
    <label for="exampleInputEmail1" class="form-label">Название тренировки</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Будет использоваться для обозначения тренировки</div>
  </div>

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

<button class="btn btn-primary rounded-circle add-button" on:click={() => changeRoute(routes.exercisesAddNew, null)}>+</button>

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