<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { NotificationType } from '../../helpers/Enums/notification';
    import { get_current_component } from 'svelte/internal'

    const THISComponent = get_current_component();

    export let type: NotificationType;
    export let message: Error;

    const bootstrapTypes = {
        [NotificationType.Error]: "danger",
        [NotificationType.Success]: "primary",
    }

    let alertNode = undefined

    function close(timeout:number) {
        setTimeout(() => {
            alertNode.classList.add("opacity-0");
        }, timeout);

        setTimeout(() => {
            THISComponent.$destroy();
        }, timeout + 500);
    }

    close(2000)


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
 <div class="container">
<div class="alert alert-{bootstrapTypes[type]}" on:click={() => close(0)} bind:this={alertNode} role="alert">
    {message}
</div>
</div>

<style>
    .opacity-0 {
        transition: all 0.5s;
        opacity: 0;
    }
</style>