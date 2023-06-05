<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, changeRoute } from "../../../helpers/routes";
    import storage from "../../../helpers/storage/storage";
    import dateTimeHelper from "../../../helpers/dateTime";
    import ButtonBack from '../../common/buttonBack.svelte';
    import ContentLoader from 'svelte-content-loader';
    import historyHelper from '../../../helpers/historyHelper';

    let weightPromise = storage.getWeight();

</script>


<h1>Отслеживание веса</h1>
<ButtonBack/>

<div class="mb-3 mt-3">
{#await weightPromise}
    <h1>{$_('weights.loading')}</h1>
    <div class="list-group">
        <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="41" width="100%" preserveAspectRatio="none">
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
        </ContentLoader>
        <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="41" width="100%" preserveAspectRatio="none">
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
        </ContentLoader>
        <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="41" width="100%" preserveAspectRatio="none">
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
        </ContentLoader>
        <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="41" width="100%" preserveAspectRatio="none">
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
        </ContentLoader>
        <ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="41" width="100%" preserveAspectRatio="none">
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
        </ContentLoader>
    </div>
{:then weights}
    {#if weights && weights.length == 0}
        <p>no weights</p>
    {:else}
        <div class="list-group">
            {#each weights as weight}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li on:click={() => changeRoute(routes.weightChange, weight)} class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" style="cursor: pointer">
                    <span><span>{dateTimeHelper.calcAgo(weight.date)}</span> - <span class="text-muted">{new Date(weight.date).toLocaleDateString()}</span></span>
                    <span class="badge bg-primary rounded-pill">{historyHelper.calcWeight(weight.weight)}</span>
                </li>
            {/each}
        </div>
    {/if}
    <button class="btn btn-primary rounded-circle add-button" on:click={() => changeRoute(routes.weightAdd)}>+</button>
{:catch error}
	<p>Oh no: {error}</p>
{/await}
</div>

