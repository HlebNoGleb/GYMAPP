<script>
    import { _ } from 'svelte-i18n';
    import routes,{ currentRoute, currentRouteData, changeState, changeRoute } from "../../helpers/routes";
    import Navbar from '../common/navbar.svelte';
    import { devMode as devModeStore } from '../../helpers/routes';
    import { onMount } from 'svelte';
    import { checkAndTryUpdateTokens, CheckTokenState, tokenStore, userStore } from '../../services/userStore';


    let devMode = false;

    let tokenState = CheckTokenState.Invalid;

    onMount(async () => {

        console.log(window.location);

        tokenState = await checkAndTryUpdateTokens();

        console.log(tokenState)

        if (tokenState == CheckTokenState.Valid) {
            changeRoute(routes.profile);
            return;
        }

        if (tokenState == CheckTokenState.Invalid) {
            changeRoute(routes.login);
            return;
        }
    })

    // currentRoute.subscribe(val => {
    //     console.log(val);
    // });

    devModeStore.subscribe(val => {
        devMode = val;
    });


</script>

<div class="container">
    {#if devMode}
        <h6>{$currentRoute.name}</h6>
        <code lang="json">{JSON.stringify($currentRouteData)}</code>
    {/if}
    {#await $currentRoute.component()}
        <div style="position: fixed; background-color: white; width: 100%; height: 100%; left: 0; top: 0; z-index: 99999; display: flex; justify-content: center; align-items: center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {:then component}
        <svelte:component this={component} data={$currentRouteData}/>
    {/await}
</div>

<!-- {#if tokenState == CheckTokenState.Valid || tokenState == CheckTokenState.NoNeed} -->
    <Navbar/>
<!-- {/if} -->

<svelte:window on:popstate={(e) => {console.log(e); changeState(window.location.hash.slice(1, window.location.hash.length), e.state)}} />

<style>
    .container{
        padding-bottom: 100px;
    }
</style>