<script lang="ts">
    import HelloScreenSlider from '../helloScreen/helloScreenSlider.svelte';
    import Router from './router.svelte';

    let skipHelloScreen = localStorage.getItem("skipHelloScreen") ?? false;

    function startUsingApp(data) {
        skipHelloScreen = data.detail.skipHelloScreen;
        localStorage.setItem("skipHelloScreen", `${skipHelloScreen}`);
    }
</script>

{#if skipHelloScreen}
    <Router />
{:else}
    <HelloScreenSlider on:updateState={startUsingApp}/>
{/if}

<style>

</style>