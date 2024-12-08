<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, previosRoutes, changeRoute, useGuidRouter } from "../../helpers/routes";
    import Navbar from '../common/navbar.svelte';
    import { devMode as devModeStore } from '../../helpers/routes';

    let devMode = false;

    devModeStore.subscribe(val => {
        devMode = val;
        console.log(devMode);
    });

    function changeRouteByHash() {

        if (!useGuidRouter) {
            return;
        }
        // const routeGuid = window.location.hash.substring(1);

        // if (!routeGuid) {
        //     changeRoute(routes.trainingsGrid, null, false);
        //     return;
        // }

        // let route = $previosRoutes.find(x => x.route.guid === routeGuid);

        // if (route) {
        //     changeRoute(route.route, route.data, false);
        // }
    }

</script>

<div class="container">
    {#if devMode}
        <h6>{$currentRoute.name}</h6>
        <code lang="json">{JSON.stringify($currentRouteData)}</code>
    {/if}
    <svelte:component this={$currentRoute.component} data={$currentRouteData}/>
</div>

<Navbar/>

<svelte:window on:hashchange={() => {changeRouteByHash()}}/>

<style>
    .container{
        padding-bottom: 100px;
    }
</style>