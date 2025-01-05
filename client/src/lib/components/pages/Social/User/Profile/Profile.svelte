<script lang="ts">
    import { onMount } from "svelte";
    import routes, { changeRoute } from "../../../../../helpers/routes";
    import { UserDto } from "../../../../../helpers/storage/User/userDto";
    import { ErrorApiResponse } from "../../../../../helpers/api/apiResponse";
    import ContentLoader from 'svelte-content-loader';

    let userPromise: Promise<UserDto> = UserDto.getProfile();
</script>

{#await userPromise}
<ContentLoader primaryColor="#d4d4ce" secondaryColor="#f6f6f6" height="120" width="100%">
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
    <rect x="0" y="50" rx="5" ry="5" width="100%" height="20" />
    <rect x="0" y="80" rx="5" ry="5" width="100" height="40" />
</ContentLoader>
{:then user}
    <h1>Профиль {user.name}</h1>
    <p>Email: {user.email}</p>
    <button class="btn btn-primary" on:click={() => changeRoute(routes.usersGrid, undefined)}>{routes.usersGrid.name}</button>
{/await}