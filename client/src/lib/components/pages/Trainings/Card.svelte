<script lang="ts">
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, changeRoute } from "../../../helpers/routes";
    export let trainingData;
    console.log(trainingData);
</script>

<div class="card">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {trainingData.exercises.length}
    </span>
    <div class="card-body">
        <h5 class="card-title">{trainingData.name}</h5>
        <!-- {#if trainingData.dates && trainingData.dates.lastTrainingDate}
            <p class="card-text">{$_('trainings.lastDate')}: {new Date(trainingData.dates.lastTrainingDate).toLocaleDateString()}</p>
        {:else}
            <p class="card-text">{$_('trainings.lastDate')}: {new Date(trainingData.dates.createDate).toLocaleDateString()}</p>
        {/if} -->
        <div class="d-flex flex-wrap my-2" style="gap: 0.2rem;">
            {#each trainingData.exerciseData as exercise}
                <!-- <div> -->
                    <span class=" badge rounded-pill text-bg-primary">{exercise.name}</span>
                <!-- </div> -->
            {/each}
        </div>
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-primary" on:click={() => changeRoute(routes.exercises, trainingData.exercises)}>{$_('trainings.start')}</button>
            <button type="button" class="btn btn-outline-primary" on:click={() => changeRoute(routes.trainingChange, trainingData)}>{$_('trainings.change')}</button>
            <!-- <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {$_('trainings.more')}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">{$_('trainings.showExercises')}</a></li>
                    <li><a class="dropdown-item" href="#">{$_('trainings.change')}</a></li>
                </ul>
            </div> -->
        </div>
    </div>
</div>