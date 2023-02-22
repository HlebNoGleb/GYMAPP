<script>
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, previosRoute, changeRoute } from "../../helpers/routes";
</script>

<h1>{$_('exercises.exercisesText')}</h1>
<h1>{$currentRouteData}</h1>
<button class="btn btn-primary" on:click={() => changeRoute(routes.exercises)}>1</button>
<button class="btn btn-primary" on:click={() => changeRoute($previosRoute)}>back</button>
<style>

</style>

