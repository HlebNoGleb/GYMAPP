import { ApiResponse, BaseApiResponse, ErrorApiResponse } from "./apiResponse";
import config from "../configs/config";
import { checkAndTryUpdateTokens, CheckTokenState, refreshTokens, tokenStore } from "../../services/userStore";
import { get } from "svelte/store";
import { UserTokens } from "../storage/User/basicUserDto";
import routes, { changeRoute } from "../routes";
import Notification from "../../components/common/notification.svelte";

interface RequestService {
    get: (url: string) => Promise<any>
    post: (url: string, data: any) => Promise<any>
    // put: (url: string, data: any) => Promise<any>
    // delete: (url: string) => Promise<any>
}

export const apiService: RequestService = {
    get: async <T>(url: string) => {
        const res = await sendRequestWithToken("GET", url);
        return await parseResponse<T>(res);
    },
    post: async function <T>(url: string, data: any): Promise<any> {
        const res = await sendRequestWithToken("POST", url, data);
        return await parseResponse<T>(res);
    }
}

async function sendRequestWithToken(method: string, url: string, data?: any, canAgain: boolean = true) {

    const tokenState = await checkAndTryUpdateTokens();

    if (tokenState == CheckTokenState.Invalid) {
        throw new Error("Token expired");
    }

    let headers:HeadersInit = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "mode": "no-cors",
        "X-Client-Type": "Web"
    };

    if (tokenState == CheckTokenState.Valid) {
        headers["Authorization"] = `Bearer ${get(tokenStore).token}`
    }

    try {
        return await fetch(`${config.apiUrl}${url}`, {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(async res => {
            if ((res.status === 401 || res.status === 403) && canAgain) {
                console.error("token expired");
                const letTryAgain = await refreshTokens();
                if (letTryAgain) {
                    return await sendRequestWithToken(method, url, data, false);
                }
            }

            return res;
        })
        .catch(err => {
            throw err;
        });

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function castToResponse<T>(json: any) {

    if (!json) {
        throw new Error("Invalid response");
    }

    if (json.success) {
        if (json.data) {
            return new ApiResponse<T>(json.success, json.message, json.data);
        }

        return new BaseApiResponse(json.success, json.message);
    }

    if (json.errors) {
        return new ErrorApiResponse<T>(json.success, json.message, json.errors);
    }

    throw new Error(json.message);
}

async function parseResponse<T>(res: any) {
    try {
        const parsedJson = await res.json();

        const parsed = await castToResponse<T>(parsedJson);
        return parsed;
    } catch (error) {
        throw error;
    }
}

