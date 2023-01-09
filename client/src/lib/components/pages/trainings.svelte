<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import config from '../../helpers/configs/config';
    import storage from '../../helpers/storage';
    import Loader from '../common/loader.svelte';

    let trainings = getTrainings();

    function test(){
        console.log(12345);
    }

    async function getTrainings(){
        return storage.getTrainings()
        .then((data) => {
            console.log(data);
            if (data){
                return data;
            } else {
                return setupDefault();
            }
        }).catch((err) => {
            console.error(err)
        });
    }

    function setupDefault() {
        return [];
    }
</script>

<h1>{$_('trainings.trainingsText')}</h1>

{#await trainings}
	<Loader>
        <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
        <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
        <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
        <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
        <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
        <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
    </Loader>
{:then trainings}
    {#if trainings && trainings.length == 0}
        <h1>{$_('trainings.noTrainings')}</h1>
    {:else}
        {#each trainings as training}
            <p>{training.name}</p>
        {/each}
    {/if}
{:catch error}
	<p>Something went wrong: {error.message}</p>
{/await}

<style>

</style>

