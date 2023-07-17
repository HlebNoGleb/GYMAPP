<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, changeRoute } from "../../../helpers/routes";
    import storage from "../../../helpers/storage/storage";
    import dateTimeHelper from "../../../helpers/dateTime";
    import ButtonBack from '../../common/buttonBack.svelte';
    import ContentLoader from 'svelte-content-loader';
    import ExerciseCard from './Card.svelte';
    import Grid2 from './Grid2.svelte';

    let exercisesPromise = storage.getExercises($currentRouteData, true);
    console.log($currentRouteData);

    const updateExercises = () => {
        exercisesPromise = storage.getExercises($currentRouteData, true);
    }
</script>

<h1>{$_('exercises.exercisesText')}</h1>
<ButtonBack/>
<Grid2 exercisesPromise={exercisesPromise}/>
