<script lang="ts">
    import { BasicUserDto, FriendshipStatus } from "../../../../helpers/storage/User/basicUserDto";
    import { cancelFriendshipRequest } from "../../../../helpers/storage/User/friendship";
    import Button from "../../button.svelte";
    import { createEventDispatcher } from "svelte";
    export let friend: BasicUserDto

    const dispatch = createEventDispatcher();

    async function cancel() {
        await cancelFriendshipRequest(friend);
        dispatch("cancel", FriendshipStatus.Sended);
    }
</script>

<Button {...$$restProps} onClick={cancel}>Отменить запрос в друзья</Button>