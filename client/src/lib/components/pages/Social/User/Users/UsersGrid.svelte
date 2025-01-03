<script lang="ts">
    import { onMount } from "svelte";
    import { BasicUserDto } from "../../../../../helpers/storage/User/basicUserDto";
    import { apiService } from "../../../../../helpers/api/requestService";
    import { ApiResponse } from "../../../../../helpers/api/apiResponse";

    const usersResponse: Promise<ApiResponse<BasicUserDto[]>> = apiService.get("/users");

</script>

<h1>Список пользователей</h1>

{#await usersResponse}
    <p>loading...</p>
{:then users}
    {#if users.data && users.data.length == 0}
        <p>Нет пользователей</p>
    {:else}
        <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3 my-2">
            {#each users.data as user}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">{user.name}</h5>
                            <p class="card-text">{user.email}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
{/await}