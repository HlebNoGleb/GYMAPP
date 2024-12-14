<script>
    import { _ } from 'svelte-i18n';

    import storage from '../../../helpers/storage/storage';
    import ExerciseCard from '../Exercises/Card.svelte';
    import { getDayName } from '../../../helpers/dateTime';
    import routes, { changeRoute } from '../../../helpers/routes';


    let lastWeight = undefined;
    let startWeight = undefined;

    const weightPromise = storage.getWeight();

    const promises = Promise.all([weightPromise])
    .then(data => {
        lastWeight = data[0].length > 0 ? data[0].slice(-1)[0].weight : undefined;
        startWeight = data[0].length > 0 ? data[0][0].weight : undefined;
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
{/await}