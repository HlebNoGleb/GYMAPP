<script lang="ts">
    import { BaseApiResponse, ErrorApiResponse } from "../../../../../helpers/api/apiResponse";
    import { currentRouteData } from "../../../../../helpers/routes";
    import { UserResetPasswordRequestDto } from "../../../../../helpers/storage/User/usetResetPassword";
    import Button from "../../../../common/button.svelte";

    let userResetPasswordRequestDto: UserResetPasswordRequestDto = new UserResetPasswordRequestDto($currentRouteData.token, "");

    let userRequestPasswordResetResult: string | ErrorApiResponse<UserResetPasswordRequestDto>;

    let confirmPassword = "";
    let passwordsMatch = true;

    async function resetPassword() {
        passwordsMatch = userResetPasswordRequestDto.newPassword == confirmPassword;

        if (!passwordsMatch) {
            return;
        }

        userRequestPasswordResetResult = await userResetPasswordRequestDto.resetPassword();

        if (typeof userRequestPasswordResetResult === "string") {
            setTimeout(() => {
                window.location.replace(window.location.origin);
            }, 3000);
        }
    }
</script>

<h1>Сброс пароля</h1>

<div class="mb-3">
    <label for="email" class="form-label">New password</label>
    <input type="email" bind:value={userResetPasswordRequestDto.newPassword} class="form-control" id="email" placeholder="test@gmail.com">
    <div class="text-danger">{userRequestPasswordResetResult instanceof ErrorApiResponse ? userRequestPasswordResetResult?.T_errors?.newPassword ?? "" : ""}</div>
</div>

<div class="mb-3">
    <label for="email" class="form-label">Confirm password</label>
    <input type="email" bind:value={confirmPassword} class="form-control" id="email" placeholder="test@gmail.com">
    <div class="text-danger">{passwordsMatch ? "" : "Passwords do not match"}</div>
</div>

{#if userRequestPasswordResetResult instanceof ErrorApiResponse}
    <div class="text-danger mb-3">{userRequestPasswordResetResult.message}</div>
{/if}

{#if typeof userRequestPasswordResetResult === "string"}
    <div class="text-success mb-3">{userRequestPasswordResetResult}</div>
{/if}

<Button class="btn btn-primary" onClick={resetPassword}>Изменить пароль</Button>