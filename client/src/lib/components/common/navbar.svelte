<script lang="ts">
    import { get } from "svelte/store";
    import routes, { currentRoute, changeRoute } from "../../helpers/routes";
    import { logout, userStore } from "../../services/userStore";
    import menuIcon from '/images/icons/navbarIcons/menu.png';


</script>

<nav class="navbar fixed-bottom">
    <div class="container-fluid">
        <div class="navbar-buttons">
            <!-- <button type="button" style="background-image: url('{routes.authSignUp.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.authSignUp)}></button> -->
            <button type="button" style="background-image: url('{routes.trainingsGrid.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.trainingsGrid, undefined)}></button>
            <button type="button" style="background-image: url('{routes.exercises.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.exercises, undefined)}></button>
            <!-- <button type="button" style="background-image: url('{routes.calendar.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.calendar, undefined)}></button> -->
            <button type="button" style="background-image: url('{routes.profile.images.icon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" on:click={() => changeRoute(routes.profile, undefined)}></button>
            <button type="button" style="background-image: url('{menuIcon}');" class="btn btn-outline-secondary navbar-btn navbar-btn-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar"></button>
        </div>
    </div>
</nav>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasSidebarLabel">GymApp</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">

        <div class="d-flex flex-column flex-shrink-0" style="height: 100%;">
            <div class="d-flex flex-column mb-auto">
                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 mb-1" data-bs-toggle="collapse" data-bs-target="#sidebar-gym-collapse" aria-expanded="true">
                    My gym
                </button>
                <div class="collapse show" id="sidebar-gym-collapse">
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li>
                            <button data-bs-dismiss="offcanvas" on:click={() => changeRoute(routes.calendar, undefined)} class:active={$currentRoute === routes.calendar} class="d-flex nav-link" style="align-items: center; width: 100%;">
                                <img src="{routes.calendar.images.icon}" alt="" width="30" height="30" class="me-3"/>
                                {routes.calendar.name}
                            </button>
                        </li>
                        <li>
                            <button data-bs-dismiss="offcanvas" on:click={() => changeRoute(routes.weightList, undefined)} class:active={$currentRoute === routes.weightList} class="d-flex nav-link" style="align-items: center; width: 100%;">
                                <img src="{routes.weightList.images.icon}" alt="" width="30" height="30" class="me-3"/>
                                {routes.weightList.name}
                            </button>
                        </li>
                        <li>
                            <button data-bs-dismiss="offcanvas" on:click={() => changeRoute(routes.mainPage, undefined)} class:active={$currentRoute === routes.mainPage} class="d-flex nav-link" style="align-items: center; width: 100%;">
                                <img src="{routes.mainPage.images.icon}" alt="" width="30" height="30" class="me-3"/>
                                {routes.mainPage.name}
                            </button>
                        </li>
                        <li>
                            <button data-bs-dismiss="offcanvas" on:click={() => changeRoute(routes.trainingsGrid, undefined)} class:active={$currentRoute === routes.trainingsGrid} class="d-flex nav-link" style="align-items: center; width: 100%;">
                                <img src="{routes.trainingsGrid.images.icon}" alt="" width="30" height="30" class="me-3"/>
                                {routes.trainingsGrid.name}
                            </button>
                        </li>
                        <li>
                            <button data-bs-dismiss="offcanvas" on:click={() => changeRoute(routes.exercises, undefined)} class:active={$currentRoute === routes.exercises} class="d-flex nav-link" style="align-items: center; width: 100%;">
                                <img src="{routes.exercises.images.icon}" alt="" width="30" height="30" class="me-3"/>
                                {routes.exercises.name}
                            </button>
                        </li>
                    </ul>
                </div>
                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 mb-1 mt-1" data-bs-toggle="collapse" data-bs-target="#sidebar-social-collapse" aria-expanded="true">
                    Social
                </button>
                <div class="collapse show" id="sidebar-social-collapse">
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li>
                            <button data-bs-dismiss="offcanvas" on:click={() => changeRoute(routes.usersGrid, undefined)} class:active={$currentRoute === routes.usersGrid} class="d-flex nav-link" style="align-items: center; width: 100%;">
                                <img src="{routes.usersGrid.images.icon}" alt="" width="30" height="30" class="me-3"/>
                                {routes.usersGrid.name}
                            </button>
                        </li>
                        <li>
                            <button data-bs-dismiss="offcanvas" on:click={() => changeRoute(routes.friends, undefined)} class:active={$currentRoute === routes.friends} class="d-flex nav-link" style="align-items: center; width: 100%;">
                                <img src="{routes.friends.images.icon}" alt="" width="30" height="30" class="me-3"/>
                                {routes.friends.name}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="{routes.profile.images.icon}" alt="" width="32" height="32" class="me-3">
                    <strong>{get(userStore).name}</strong>
                </a>
                <ul class="dropdown-menu text-small shadow" style="">
                    <li>
                        <button data-bs-dismiss="offcanvas" class="dropdown-item" on:click={() => {changeRoute(routes.profile, undefined)}}>{routes.profile.name}</button>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <button data-bs-dismiss="offcanvas" class="dropdown-item" on:click={logout}>Sign out</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    .navbar{
        background-color: var(--body-background);
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
        background-size: 35px;
        background-repeat: no-repeat;
    }

    .nav-link{
        color: var(--dark-color);
        font-size: large;
    }

    .nav-link.active{
        color: var(--white-color);
    }

    .nav-link.active img{
        filter: invert(1);
    }

    .btn-toggle {
        padding: .25rem .5rem;
        font-weight: 600;
        color: rgba(0, 0, 0, .65);
        background-color: transparent;
    }

    .btn-toggle:hover,
    .btn-toggle:focus {
        color: rgba(0, 0, 0, .85);
        background-color: var(--main-color-opacity-50);
    }

    .btn-toggle::before {
        width: 1.25em;
        line-height: 0;
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
        transition: transform .35s ease;
        transform-origin: .5em 50%;
    }

    .btn-toggle[aria-expanded="true"] {
        color: rgba(0, 0, 0, .85);
    }
    .btn-toggle[aria-expanded="true"]::before {
        transform: rotate(90deg);
    }
</style>