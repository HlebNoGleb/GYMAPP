<script>
    import { _ } from 'svelte-i18n';
    import { currentRoute, currentRouteData } from "../../helpers/routes";
    import Navbar from '../common/navbar.svelte';
</script>

<div class="container">
    <h6>{$currentRoute.name}</h6>
    <svelte:component this={$currentRoute.component} data={$currentRouteData}/>
</div>

<Navbar/>

<style>
    .container{
        padding-bottom: 100px;
    }
</style>