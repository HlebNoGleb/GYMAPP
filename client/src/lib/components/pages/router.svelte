<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { currentRoute, currentRouteData } from "../../helpers/routes";
    import Navbar from '../common/navbar.svelte';

    console.log(currentRoute);
</script>


<div class="container">
    <svelte:component this={$currentRoute.component}/>
</div>

<Navbar/>

<style>
    .container{
        padding-bottom: 80px;
    }
</style>