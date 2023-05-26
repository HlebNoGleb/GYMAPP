<script lang="ts">
    import routes, { currentRoute, changeRoute } from "../../helpers/routes";
</script>

<nav class="navbar fixed-bottom">
    <div class="container-fluid">
        <div class="navbar-buttons">
            <!-- <button type="button" style="background-image: url('{routes.authSignIn.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.authSignIn)}></button>
            <button type="button" style="background-image: url('{routes.authSignUp.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.authSignUp)}></button> -->
            <button type="button" style="background-image: url('{routes.trainingsGrid.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.trainingsGrid)}></button>
            <button type="button" style="background-image: url('{routes.exercises.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.exercises, 0)}></button>
            <button type="button" style="background-image: url('{routes.weightList.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-2" on:click={() => changeRoute(routes.weightList)}></button>
            <button type="button" style="background-image: url('{routes.socialMain.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-2" on:click={() => changeRoute(routes.socialMain)}></button>
        </div>
    </div>
</nav>

<style>
    .navbar{
        background-color: var(--body-background);
        /* box-shadow: 0px -10px 10px 5px var(--body-background), 0px -20px 20px 5px var(--body-background); */
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