<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Trainings from './trainings.svelte';
    import Navbar from '../common/navbar.svelte';

    const defaultComponent = Trainings;
    let currentComponent = defaultComponent;

    function changeRoute(data: { detail: { route: any; }; }){
        const route = data.detail.route;
        currentComponent = route.component;
    }
</script>

<div class="container">
    <svelte:component this={currentComponent}/>
</div>

<Navbar on:changeRoute={changeRoute}/>

<style>
    .container{
        padding-bottom: 80px;
    }
</style>