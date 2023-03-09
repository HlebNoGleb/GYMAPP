<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, changeRoute } from "../../../helpers/routes";
    import storage from "../../../helpers/storage/storage";
    import dateTimeHelper from "../../../helpers/dateTime";
    import ButtonBack from '../../common/buttonBack.svelte';
    import ContentLoader from 'svelte-content-loader';
    import ExerciseCard from '../Exercises/Card.svelte';

    let exercisesPromise = storage.getTrainingExercise($currentRouteData);

    const updateExercises = () => {
        exercisesPromise = storage.getTrainingExercise($currentRouteData);
    }
</script>

<h1>{$_('exercises.exercisesText')}</h1>
<ButtonBack/>

<div class="mb-3 mt-3">
{#await exercisesPromise}
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
{:then exercises}
    {#if exercises && exercises.length == 0}
        <p>no exercises</p>
    {:else}
        <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3">
            {#each exercises as exercise}
            <div class="col">
                <ExerciseCard exerciseData={exercise}/>
            </div>
            {/each}
        </div>
    {/if}
{:catch error}
	<p>Oh no: {error}</p>
{/await}
</div>