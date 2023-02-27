<script lang="ts">
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, changeRoute } from "../../../helpers/routes";
    import historyHelper from '../../../helpers/historyHelper';
    import dateTimeHelper from '../../../helpers/dateTime';
    export let exerciseData;

    function viewHistory(history) {
        return history.map(item => `<span class='badge bg-secondary m-1'>${historyHelper.calcCount(item.count)} x ${historyHelper.calcWeight(item.weight)}</span>`).join("");
    }
</script>

<div class="card h-100">
    <div class="card-body">
        <h5 class="card-title">{exerciseData.name}</h5>
        <div class="card-text">{@html viewHistory(exerciseData.lastHistory)}</div>
        <button class="btn btn-primary" on:click={() => changeRoute(routes.exerciseHistory, exerciseData)}>Перейти</button>
    </div>
    <div class="card-footer text-muted">
        {dateTimeHelper.calcAgo(exerciseData.lastDateTime)}
    </div>
</div>

<style>
    .card-text{
        margin: -0.25rem !important;
        margin-bottom: 0.5rem!important;
    }
</style>

