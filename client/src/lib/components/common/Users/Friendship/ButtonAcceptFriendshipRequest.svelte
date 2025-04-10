<script lang="ts">
    import { BasicUserDto, FriendshipStatus } from "../../../../helpers/storage/User/basicUserDto";
    import { acceptFriendshipRequest } from "../../../../helpers/storage/User/friendship";
    import Button from "../../button.svelte";
    import { createEventDispatcher } from "svelte";
    export let friend: BasicUserDto

    const dispatch = createEventDispatcher();

    async function accept() {
        await acceptFriendshipRequest(friend);
        dispatch("accept", FriendshipStatus.Sended);
    }
</script>

<Button {...$$restProps} onClick={accept}>Принять запрос</Button>