<script lang="ts">
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, changeRoute } from "../../../helpers/routes";
    export let trainingData;
</script>

<div class="card">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {trainingData.exercises.length}
    </span>
    <div class="card-body">
        <h5 class="card-title">{trainingData.name}</h5>
        {#if trainingData.dates && trainingData.dates.lastTrainingDate}
            <p class="card-text">{$_('trainings.lastDate')}: {new Date(trainingData.dates.lastTrainingDate).toLocaleDateString()}</p>
        {:else}
            <p class="card-text">{$_('trainings.lastDate')}: {new Date(trainingData.dates.createDate).toLocaleDateString()}</p>
        {/if}
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-outline-primary" on:click={() => changeRoute(routes.exercises, trainingData.exercises)}>{$_('trainings.start')}</button>
            <button type="button" class="btn btn-outline-primary" on:click={() => changeRoute(routes.trainingHistory, trainingData.exercises)}>{$_('trainings.details')}</button>
            <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {$_('trainings.more')}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">{$_('trainings.showExercises')}</a></li>
                    <li><a class="dropdown-item" href="#">{$_('trainings.change')}</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>