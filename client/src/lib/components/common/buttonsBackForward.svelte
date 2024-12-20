<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { goBack, goForward, useStateRouter, previosRoutes } from "../../helpers/routes";

</script>

<!-- {#if $previosRoutes.length > 0} -->
    <button class="btn btn-primary" on:click={goBack}>{$_('ButtonBack')}</button>
    <button class="btn btn-primary" on:click={goForward}>{$_('ButtonNext')}</button>
    <!-- {#if useStateRouter}
        <button class="btn btn-primary" on:click={goForward}>{$_('ButtonNext')}</button>
    {/if} -->
<!-- {/if} -->
