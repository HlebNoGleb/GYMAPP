<script lang="ts">
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, changeRoute, goBack } from "../../helpers/routes";
</script>

<button class="btn btn-primary" on:click={goBack}>{$_('ButtonBack')}</button>