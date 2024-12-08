<!-- trainings main page -->
<script>
// @ts-nocheck

    import { _ } from 'svelte-i18n';
    import storage from "../../../helpers/storage/storage";
    import TrainingCard from './Card.svelte';
    import ContentLoader from 'svelte-content-loader';
    import routes, { changeRoute } from '../../../helpers/routes';
    import ButtonBack from '../../common/buttonBack.svelte';

    let trainingPromise = storage.getTrainings();

    const updateTrainings = () => {
        trainingPromise = storage.getTrainings();
    }
</script>

{#await trainingPromise}
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
{:then trainings}
    {#if trainings && trainings.length == 0}
        <h1>{$_('trainings.noTrainings')}</h1>
        <ButtonBack/>
    {:else}
        <h1>{$_('trainings.trainingsText')}</h1>
        <ButtonBack/>
        <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3 mt-2">
            {#each trainings as training}
                <div class="col">
                    <TrainingCard trainingData={training}/>
                </div>
            {/each}
        </div>
    {/if}
    <button class="btn btn-primary rounded-circle add-button" on:click={() => changeRoute(routes.trainingsAdd)}>+</button>
{:catch error}
	<p>Oh no: {error}</p>
{/await}