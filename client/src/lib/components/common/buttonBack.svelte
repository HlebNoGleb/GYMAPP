<script lang="ts">
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, previosRoute, changeRoute } from "../../helpers/routes";
</script>

<button class="btn btn-primary" on:click={() => changeRoute($previosRoute)}>{$_('ButtonBack')}</button>