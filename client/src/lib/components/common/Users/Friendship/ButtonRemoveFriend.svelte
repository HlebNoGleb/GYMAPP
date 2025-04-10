<script lang="ts">
    import { BasicUserDto, FriendshipStatus } from "../../../../helpers/storage/User/basicUserDto";
    import { endFriendship } from "../../../../helpers/storage/User/friendship";
    import Button from "../../button.svelte";
    import { createEventDispatcher } from "svelte";
    export let friend: BasicUserDto

    const dispatch = createEventDispatcher();

    async function end() {
        await endFriendship(friend);
        dispatch("end", FriendshipStatus.Sended);
    }
</script>

<Button {...$$restProps} onClick={end}>Удалить из друзей</Button>