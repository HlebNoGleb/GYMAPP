<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, changeRoute } from "../../../helpers/routes";
    import storage from "../../../helpers/storage";
    import dateTimeHelper from "../../../helpers/dateTime";
    import ButtonBack from '../../common/buttonBack.svelte';
    import ContentLoader from 'svelte-content-loader';

    let exercisesPromise = storage.getTrainingExercise($currentRouteData);

    const updateExercises = () => {
        exercisesPromise = storage.getTrainingExercise($currentRouteData);
    }
</script>

<h1>{$_('exercises.exercisesText')}</h1>
<ButtonBack/>

{#await exercisesPromise}
    <h1>{$_('trainings.loading')}</h1>
    <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3">
        <div class="col">
            <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="150">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
                <rect x="0" y="45" rx="5" ry="5" width="250" height="25" />
                <rect x="0" y="90" rx="5" ry="5" width="100" height="50" />
                <rect x="110" y="90" rx="5" ry="5" width="100" height="50" />
                <rect x="220" y="90" rx="5" ry="5" width="100" height="50" />
            </ContentLoader>
        </div>
        <div class="col">
            <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="150">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
                <rect x="0" y="45" rx="5" ry="5" width="250" height="25" />
                <rect x="0" y="90" rx="5" ry="5" width="100" height="50" />
                <rect x="110" y="90" rx="5" ry="5" width="100" height="50" />
                <rect x="220" y="90" rx="5" ry="5" width="100" height="50" />
            </ContentLoader>
        </div>
        <div class="col">
            <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="150">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
                <rect x="0" y="45" rx="5" ry="5" width="250" height="25" />
                <rect x="0" y="90" rx="5" ry="5" width="100" height="50" />
                <rect x="110" y="90" rx="5" ry="5" width="100" height="50" />
                <rect x="220" y="90" rx="5" ry="5" width="100" height="50" />
            </ContentLoader>
        </div>
    </div>
{:then exercises}
    {#if exercises && exercises.length == 0}
        <p>no exercises</p>
    {:else}
        <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3 list-group">
            {#each exercises as exercise}
                <div class="col">
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{exercise.name}</h5>
                        <small>{dateTimeHelper.calcAgo(exercise.lastDateTime)}</small>
                        </div>
                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small>And some small print.</small>
                    </a>
                    <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="150">
                        <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
                        <rect x="0" y="45" rx="5" ry="5" width="250" height="25" />
                        <rect x="0" y="90" rx="5" ry="5" width="100" height="50" />
                        <rect x="110" y="90" rx="5" ry="5" width="100" height="50" />
                        <rect x="220" y="90" rx="5" ry="5" width="100" height="50" />
                    </ContentLoader>
                </div>
            {/each}
        </div>
    {/if}
{:catch error}
	<p>Oh no: {error}</p>
{/await}