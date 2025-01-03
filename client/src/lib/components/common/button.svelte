<script lang="ts">
    export let onClick;
    export let loading = false;

    async function handleClick(...args) {
        loading = true;

        try {
            await onClick(...args);
        } catch (error) {
            loading = false;
            throw error;
        }
        finally {
            loading = false;
        }
    }
</script>

<button on:click={handleClick} disabled={loading} {...$$restProps}>
    {#if loading}
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    {/if}
    <slot></slot>
</button>

<style>
    .spinner-border{
        --bs-spinner-width: 1rem;
        --bs-spinner-height: 1rem;
        --bs-spinner-border-width: 0.15em;
    }

    button:disabled {
        cursor: progress;
    }
</style>