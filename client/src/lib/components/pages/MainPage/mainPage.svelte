<script>
    import { _ } from 'svelte-i18n';

    import storage from '../../../helpers/storage/storage';
    import ExerciseCard from '../Exercises/Card.svelte';
    import { getDayName } from '../../../helpers/dateTime';
    import routes, { changeRoute } from '../../../helpers/routes';

    // TODO - переделать календарь полностью на нормальные даты (timestamp) и не генерировать, а просто брать из хранилища историй

    let lastWeight = undefined;
    let startWeight = undefined;

    let lastTraining = undefined;


    const weightPromise = storage.getWeight();
    const lastTrainingPromise = storage.getCalendar();


    const promises = Promise.all([weightPromise, lastTrainingPromise])
    .then(data => {
        lastWeight = data[0].length > 0 ? data[0].slice(-1)[0].weight : undefined;
        startWeight = data[0].length > 0 ? data[0][0].weight : undefined;
        lastTraining = {
            date: data[1].length > 0 ? data[1].slice(-1)[0].date : undefined,
            exercisesIds: data[1].length > 0 ? data[1].slice(-1)[0].exercises : undefined,
            exercises: []
        }

        return new Promise((resolve, reject) => {
            if (lastTraining.exercisesIds && lastTraining.exercisesIds.length > 0) {
                const exercises = storage.getExercises(lastTraining.exercisesIds, true);
                resolve(exercises);
            }
        }).then((exercises) => {
            lastTraining.exercises = exercises;
            console.log(lastTraining);
        });
    });


</script>

<h1>
    {getDayName(new Date())}, {$_('main_page_h1')}
</h1>
<button type="button" class="btn btn-primary my-3" on:click={() => changeRoute(routes.trainingsGrid)}>Начать новую тренировку</button>


{#await promises}
    <p>loading...</p>
{:then}
    {#if startWeight}
        <p>Ваш стартовый вес: {startWeight}</p>
    {/if}
    {#if lastWeight}
        <p>Ваш последний вес: {lastWeight}</p>
    {/if}
    {#if lastTraining}
        <p>Последняя тренировка: {lastTraining.date}, {getDayName(new Date(lastTraining.date))}</p>
        <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3">
            {#each lastTraining.exercises as exercise}
                <div class="col">
                    <ExerciseCard exerciseData={exercise} showButtons={false}/>
                </div>
            {/each}
        </div>
    {/if}
{/await}