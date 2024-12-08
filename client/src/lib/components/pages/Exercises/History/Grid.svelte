<script>
// @ts-nocheck
    import { _ } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import routes, { currentRouteData, changeRoute } from "../../../../helpers/routes";
    import dateTimeHelper from "../../../../helpers/dateTime";
    import storage from "../../../../helpers/storage/storage";
    import ButtonBack from '../../../common/buttonBack.svelte';
    import ContentLoader from 'svelte-content-loader';
    import historyHelper from '../../../../helpers/historyHelper';
    import arrayHelper from '../../../../helpers/array';
    let exerciseData = $currentRouteData;

    let exerciseHistoryPromise = storage.getHistory(exerciseData.id);
    console.log(exerciseHistoryPromise);

    const updateExercises = () => {
        exerciseHistoryPromise = storage.getHistory(exerciseData.id);
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
        {#if arrayHelper.hasData(histories)}
            <button class="btn btn-primary mb-2" on:click={() => changeRoute(routes.exerciseHistoryProgress, histories)}>Прогресс</button>
            <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3">
                {#each histories as history}
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-header text-muted">
                                <!-- {JSON.stringify(history)} -->
                                {new Date(history.date).toLocaleDateString()} - {dateTimeHelper.getDayName(history.date)}
                            </div>
                            <ul class="list-group list-group-flush">
                                {#each history.data as data}
                                    <button on:click={() => changeRoute(routes.exerciseHistoryChange, data)} class="list-group-item list-group-item-action">{historyHelper.calcWeight(data.weight)} x {historyHelper.calcCount(data.count)}</button>
                                {/each}
                            </ul>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <p>no history</p>
        {/if}
    {:catch error}
        <p>Oh no: {error}</p>
    {/await}
</div>

<button class="btn btn-primary rounded-circle add-button" on:click={() => changeRoute(routes.exerciseHistoryAddNew, exerciseData.id)}>+</button>

<style>

</style>