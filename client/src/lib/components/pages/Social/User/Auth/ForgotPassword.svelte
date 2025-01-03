<script lang="ts">
    import { ErrorApiResponse } from '../../../../../helpers/api/apiResponse';
    import routes, { changeRoute } from '../../../../../helpers/routes';
    import { UserRequestPasswordResetDto } from '../../../../../helpers/storage/User/usetResetPassword';
    import Button from '../../../../common/button.svelte';

    let userRequestPasswordResetDto: UserRequestPasswordResetDto = new UserRequestPasswordResetDto("gynyax5@gmail.com");

    let userRequestPasswordResetResult: string | ErrorApiResponse<UserRequestPasswordResetDto>;

    async function sendResetRequest() {
        userRequestPasswordResetResult = await userRequestPasswordResetDto.sendResetPasswordRequest();
    }
</script>

<h1>Забыли пароль</h1>

<div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" bind:value={userRequestPasswordResetDto.email} class="form-control" id="email" placeholder="test@gmail.com">
    <div class="text-danger">{userRequestPasswordResetResult instanceof ErrorApiResponse ? userRequestPasswordResetResult?.T_errors?.email ?? "" : ""}</div>
</div>

{#if userRequestPasswordResetResult instanceof ErrorApiResponse}
    <div class="text-danger mb-3">{userRequestPasswordResetResult.message}</div>
{/if}

{#if typeof userRequestPasswordResetResult === "string"}
    <div class="text-success mb-3">{userRequestPasswordResetResult}</div>
{/if}

<Button class="btn btn-primary" onClick={sendResetRequest}>Восстановить</Button>