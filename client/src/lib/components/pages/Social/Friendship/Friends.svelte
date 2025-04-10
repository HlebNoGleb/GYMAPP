<script lang="ts">
    import { BasicUserDto, FriendshipStatus } from "../../../../helpers/storage/User/basicUserDto";
    import { apiService } from "../../../../helpers/api/requestService";
    import { ApiResponse, PagedResult } from "../../../../helpers/api/apiResponse";
    import ButtonSendFriendshipRequest from "../../../common/Users/Friendship/ButtonSendFriendshipRequest.svelte";
    import ButtonCancelFriendshipRequest from "../../../common/Users/Friendship/ButtonCancelFriendshipRequest.svelte";
    import ButtonAcceptFriendshipRequest from "../../../common/Users/Friendship/ButtonAcceptFriendshipRequest.svelte";
    import ButtonRemoveFriend from "../../../common/Users/Friendship/ButtonRemoveFriend.svelte";
    import Pagination from "../../../common/pagination.svelte";

    let usersResponse: Promise<ApiResponse<PagedResult<BasicUserDto>>> = apiService.get("/friendships/getFriends");

</script>

<h1>Список пользователей</h1>

{#await usersResponse}
    <p>loading...</p>
{:then users}
    {#if users.data.items && users.data.items.length == 0}
        <p>Нет пользователей</p>
    {:else}
    <div class="d-flex flex-column">
        <div class="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-3 my-2">
            {#each users.data.items as user}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">{user.name}</h5>
                            <p class="card-text">{user.email}</p>
                        </div>
                        <div class="card-footer">
                            <ButtonRemoveFriend class="btn btn-outline-danger" friend={user} on:end={(e) => {}}/>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <Pagination currentPage={users.data.currentPage} pageCount={users.data.totalPages} on:changePage={(e) => {
            usersResponse = apiService.get(`/friendships/getFriends?pg=${e.detail}`);
        }}/>
    </div>
    {/if}
{/await}