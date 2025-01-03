<script lang="ts">
    import { onMount } from "svelte";
    import routes, { currentRoute, currentRouteData, changeRoute } from "../../../../../helpers/routes";
    import { apiService } from "../../../../../helpers/api/requestService";
    import { BaseApiResponse } from "../../../../../helpers/api/apiResponse";

    enum State {
        Loading,
        Success,
        Error,
    }

    const bootstrapTypes = {
        [State.Error]: "danger",
        [State.Success]: "primary",
        [State.Loading]: "info",
    }

    let state = State.Loading;
    let responseResult: BaseApiResponse = {
        success: false,
        message: "Проверка электронной почты в процессе...",
    };

    onMount(async () => {
        if (!$currentRouteData.token) {
            window.location.replace(window.location.origin);
        }

        try{
            const response = await apiService.get(`/users/confirm-email?token=${$currentRouteData.token}`);

            if (response instanceof BaseApiResponse) {

                if (response.success) {
                    state = State.Success;
                } else {
                    state = State.Error;
                }

                responseResult = response;

                setTimeout(() => {
                    window.location.replace(window.location.origin);
                }, 3000);
            }
        }
        catch (error) {
            state = State.Error;
            responseResult.message = "Что-то пошло не так";
        }
    })
</script>

<h1>Подтверждение электронной почты</h1>
<div class="alert alert-{bootstrapTypes[state]}" role="alert">
    {responseResult.message}
</div>