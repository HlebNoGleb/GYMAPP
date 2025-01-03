import { get, type Writable, writable } from 'svelte/store';
import config  from '../helpers/configs/config';
import { BasicUserDto, UserTokens } from '../helpers/storage/User/basicUserDto';
import { ApiResponse } from '../helpers/api/apiResponse';
import routes, { currentRoute as currentRouteStore } from '../helpers/routes';

function createPersistedStore<T>(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    const data = storedValue ? JSON.parse(storedValue) : initialValue;
    let store: Writable<T> = writable(data);
    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });
    return store;
}

export const userStore = createPersistedStore<BasicUserDto>(`${config.localStorageKeyPrefix}user`, null);
export const tokenStore = createPersistedStore<UserTokens>(`${config.localStorageKeyPrefix}token`, null);

export async function checkAndTryUpdateTokens() {

    const currentRoute = get(currentRouteStore);

    if (currentRoute.withoutAuth) {
        return CheckTokenState.NoNeed
    }

    const tokens = get(tokenStore);

    if (!tokens) {
        console.error("Tokens not found");
        return CheckTokenState.Invalid;
    }

    if (new Date(tokens.expiration) > new Date()) {
        console.info("Access token valid");
        return CheckTokenState.Valid;
    }

    if (new Date(tokens.refreshExpiration) < new Date()) {
        console.error("Refresh token expired");
        return CheckTokenState.Invalid;
    }

    return await successRefreshTokens();
}

export enum CheckTokenState {
    Valid,
    Invalid,
    NoNeed
}

async function successRefreshTokens() {
    let successRefresh = await refreshTokens();

    if (!successRefresh) {
        tokenStore.set(null);
        userStore.set(null);

        return CheckTokenState.Invalid
    }

    return CheckTokenState.Valid
}

export async function refreshTokens(){
    const refreshToken = get(tokenStore).refreshToken;

    const newTokens = await fetch(`${config.apiUrl}/users/refresh-token?refreshToken=${refreshToken}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
            "mode": "no-cors"
        },
    });

    try {
        const tokens:ApiResponse<UserTokens> = await newTokens.json();
        tokenStore.set(tokens.data);
        console.info("Tokens refreshed");
        return true;
    } catch (error) {
        console.error("Tokens refresh failed");
        return false;
    }
}