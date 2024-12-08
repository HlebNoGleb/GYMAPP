<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, changeRoute } from "../../../helpers/routes";
    import storage from "../../../helpers/storage/storage";
    import dateTimeHelper from "../../../helpers/dateTime";
    import ButtonBack from '../../common/buttonsBackForward.svelte';
    import ContentLoader from 'svelte-content-loader';
    import ExerciseCard from './Card.svelte';
    import Grid2 from './Grid2.svelte';

    const exercises = $currentRouteData?.exercises;
    let trainingId = undefined;
    let exercisesPromise = undefined;


    currentRouteData.subscribe(val => {
        trainingId = val?.id;
        exercisesPromise = trainingId ? storage.getTrainingExercises(trainingId, true) : storage.getExercises([], true);
    });

    // console.log($currentRouteData);
    // console.log(trainingId);

</script>
{#if trainingId}
    <h1>{$_('exercises.trainingExercises')} {$currentRouteData.name}</h1>
{:else}
    <h1>{$_('exercises.allExercises')}</h1>
{/if}
<ButtonBack/>
<Grid2 exercisesPromise={exercisesPromise} training={$currentRouteData}/>