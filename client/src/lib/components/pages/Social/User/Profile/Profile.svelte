<script lang="ts">
    import { onMount } from "svelte";
    import routes, { changeRoute } from "../../../../../helpers/routes";
    import { UserDto } from "../../../../../helpers/storage/User/userDto";
    import { ErrorApiResponse } from "../../../../../helpers/api/apiResponse";

    let userPromise: Promise<UserDto> = UserDto.getProfile();
</script>

{#await userPromise}
    <p>loading...</p>
{:then user}
    <h1>Профиль {user.name}</h1>
    <p>Email: {user.email}</p>
{/await}



<button class="btn btn-primary" on:click={() => changeRoute(routes.login, undefined)}>{routes.login.name}</button>
<button class="btn btn-primary" on:click={() => changeRoute(routes.register, undefined)}>{routes.register.name}</button>
<button class="btn btn-primary" on:click={() => changeRoute(routes.usersGrid, undefined)}>{routes.usersGrid.name}</button>