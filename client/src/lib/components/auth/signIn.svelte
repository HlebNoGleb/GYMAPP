<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../common/buttonsBackForward.svelte';
    import { writable } from 'svelte/store';
    import { userStore, currentRoute, currentRouteData } from "../../helpers/routes";

    let email = '';
    let password = '';

    let token;

    async function getToken() {
        if (token) return token;
        let response = await fetch("http://localhost:3001/users/token", {
            method: 'GET',
            credentials: 'include'
        })
        if (response.ok) {
            let data = await response.json();
            token = data.token;

            return token;
        }

        return null;
    }

    async function getUser() {
        let accessToken = await getToken();

        if (!accessToken) return;
        let userResponse = await fetch("http://localhost:3001/users/getUser", {
            method: 'POST',
            headers: {
                authorization: accessToken
            }
        });
        var data = await userResponse.json();

        return userResponse.ok ? data : null;
    }

    async function authorize () {
        await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3001'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        let user = await getUser();

        if (user) userStore.update(data => user);
    }
</script>

{#if $userStore}
    <div>
        Logged IN
    </div>
{/if}
<h1>Авторизация</h1>

<form on:submit|preventDefault={authorize}>
    <div class="mb-3">
        <label for="authEmailInput" class="form-label">Email</label>
        <input type="email" bind:value={email} class="form-control" id="authEmailInput" aria-describedby="emailHelp">

        <label for="authPasswordInput" class="form-label">Password</label>
        <input type="password" bind:value={password} class="form-control" id="authPasswordInput" aria-describedby="emailHelp">

        <button class="mt-3 w-50 btn btn-lg btn-primary" type="submit">Login</button>

    </div>
</form>


<ButtonBack/>