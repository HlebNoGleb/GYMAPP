<script lang="ts">
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, changeRoute } from "../../../helpers/routes";
    import historyHelper from '../../../helpers/historyHelper';
    import dateTimeHelper from '../../../helpers/dateTime';
    import arrayHelper from '../../../helpers/array';
    export let exerciseData;
</script>

<div class="card h-100">
    <div class="card-body">
        <h5 class="card-title">{exerciseData.name}</h5>
        {#if arrayHelper.hasData(exerciseData.lastHistory)}
            {#each exerciseData.lastHistory as lastHistory}
                {new Date(lastHistory.date).toLocaleDateString()} - {dateTimeHelper.getDayName(lastHistory.date)}
                <div class="d-flex flex-wrap my-2" style="gap: 0.2rem;">
                    {#each lastHistory.data as data}
                        <span class='badge rounded-pill text-bg-primary'>
                            {historyHelper.calcCount(data.count)} x {historyHelper.calcWeight(data.weight)}
                        </span>
                    {/each}
                </div>
            {/each}
        {/if}
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button class="btn btn-primary" on:click={() => changeRoute(routes.exerciseHistory, exerciseData)}>Перейти</button>
            <button class="btn btn-outline-primary" on:click={() => changeRoute(routes.exercisesChange, exerciseData)}>Изменить</button>
        </div>
    </div>
    <!-- <div class="card-footer text-muted">
        {dateTimeHelper.calcAgo(exerciseData.lastDateTime)}
    </div> -->
</div>

<style>
    .card-text{
        margin: -0.25rem !important;
        margin-bottom: 0.5rem!important;
    }
</style>

