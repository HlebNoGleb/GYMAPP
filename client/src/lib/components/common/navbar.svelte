<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import routes from '../../helpers/routes';
    const dispatch = createEventDispatcher();

    function changeRoute(data) {
        dispatch('changeRoute', data)
    }
</script>

<nav class="navbar fixed-bottom">
    <div class="container-fluid">
        <div class="navbar-buttons">
            <button type="button" style="background-image: url('{routes.training.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute({route:routes.training})}></button>
            <button type="button" style="background-image: url('{routes.exercises.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-2" on:click={() => changeRoute({route:routes.exercises})}></button>
        </div>
    </div>
</nav>

<style>
    .navbar{
        background-color: var(--body-background);
        box-shadow: 0px -10px 10px 5px var(--body-background), 0px -20px 20px 5px var(--body-background);
    }
    .navbar-buttons{
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
    .navbar-btn{
        width: 50px;
        height: 50px;
        background-position: center;
        background-size: contain;
    }
</style>