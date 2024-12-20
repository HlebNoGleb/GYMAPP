<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, previosRoutes, changeRoute, changeState } from "../../helpers/routes";
    import Navbar from '../common/navbar.svelte';
    import { devMode as devModeStore } from '../../helpers/routes';

    let devMode = false;

    currentRoute.subscribe(val => {
        console.log(val);
    });

    devModeStore.subscribe(val => {
        devMode = val;
        //console.log(devMode);
    });

</script>

<div class="container">
    {#if devMode}
        <h6>{$currentRoute.name}</h6>
        <code lang="json">{JSON.stringify($currentRouteData)}</code>
    {/if}

    <svelte:component this={$currentRoute.component} data={$currentRouteData}/>
</div>

<Navbar/>

<svelte:window on:popstate={(e) => {console.log(e); changeState(window.location.hash.slice(1, window.location.hash.length), e.state)}} />



<style>
    .container{
        padding-bottom: 100px;
    }
</style>