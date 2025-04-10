<script lang="ts">
    import { BasicUserDto, FriendshipStatus } from "../../../../helpers/storage/User/basicUserDto";
    import { sendFriendshipRequest } from "../../../../helpers/storage/User/friendship";
    import Button from "../../button.svelte";
    import { createEventDispatcher } from "svelte";
    export let friend: BasicUserDto

    const dispatch = createEventDispatcher();

    async function send() {
        await sendFriendshipRequest(friend);
        dispatch("send", FriendshipStatus.Sended);
    }
</script>

<Button {...$$restProps} onClick={send}>Добавить в друзья</Button>