<script>
// @ts-nocheck
    import { _ } from 'svelte-i18n';
    import routes, { currentRouteData, changeRoute } from "../../../../helpers/routes";
    import dateTimeHelper from "../../../../helpers/dateTime";
    import storage from "../../../../helpers/storage";
    import ButtonBack from '../../../common/buttonBack.svelte';
    import ContentLoader from 'svelte-content-loader';
    import historyHelper from '../../../../helpers/historyHelper';
    let exerciseData = $currentRouteData;

    let exerciseHistoryPromise = storage.getExerciseHistory(exerciseData.id);

    console.log(exerciseHistoryPromise);

    const updateExercises = () => {
        exerciseHistoryPromise = storage.getTrainingExercise(exerciseData.id);
    }
</script>

<h1>{exerciseData.name}</h1>
<ButtonBack/>

<div class="mb-3 mt-3">
    {#await exerciseHistoryPromise}
        <h1>{$_('trainings.loading')}</h1>
        <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3">
            <div class="col">
                <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="100">
                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
                    <rect x="0" y="25" rx="5" ry="5" width="250" height="15" />
                    <rect x="0" y="50" rx="5" ry="5" width="100" height="10" />
                </ContentLoader>
            </div>
            <div class="col">
                <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="100">
                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
                    <rect x="0" y="25" rx="5" ry="5" width="250" height="15" />
                    <rect x="0" y="50" rx="5" ry="5" width="100" height="10" />
                </ContentLoader>
            </div>
            <div class="col">
                <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="100">
                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
                    <rect x="0" y="25" rx="5" ry="5" width="250" height="15" />
                    <rect x="0" y="50" rx="5" ry="5" width="100" height="10" />
                </ContentLoader>
            </div>
        </div>
    {:then histories}
        {#if histories && histories.length == 0}
            <p>no history</p>
        {:else}
            <button class="btn btn-primary mb-2" on:click={() => changeRoute(routes.exerciseHistoryProgress, histories)}>Прогресс</button>
            <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3">
                {#each histories as history}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-header text-muted">
                            {new Date(history.date).toLocaleDateString()}
                        </div>
                        <ul class="list-group list-group-flush">
                            {#each history.podhods as set}
                                <button on:click={() => changeRoute(routes.exerciseHistoryChange, set)} class="list-group-item list-group-item-action">{historyHelper.calcWeight(set.weight)} x {historyHelper.calcCount(set.count)}</button>
                            {/each}
                        </ul>
                    </div>
                </div>
                {/each}
            </div>
        {/if}
    {:catch error}
        <p>Oh no: {error}</p>
    {/await}
</div>

<button class="btn btn-primary rounded-circle add-button" on:click={() => changeRoute(routes.exerciseHistoryAddNew, null)}>+</button>

<style>

</style>