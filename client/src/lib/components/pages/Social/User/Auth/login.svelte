<script lang="ts">
    import { ErrorApiResponse } from '../../../../../helpers/api/apiResponse';
    import routes, { changeRoute } from '../../../../../helpers/routes';
    import { BasicUserDto } from '../../../../../helpers/storage/User/basicUserDto';
    import { UserLogin, UserLoginDto } from '../../../../../helpers/storage/User/userLogin';
    import Button from '../../../../common/button.svelte';

    let userLoginDto: UserLoginDto = new UserLoginDto("gynyax5@gmail.com", "1223334444");

    let userLoginResult: BasicUserDto | ErrorApiResponse<UserLoginDto>;

    async function login() {
        const userLogin = new UserLogin(userLoginDto);
        userLoginResult = await userLogin.login();

        if (userLoginResult instanceof BasicUserDto) {
            changeRoute(routes.profile, userLoginResult);
        }
    }
</script>

<h1>Авторизация</h1>
<div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" bind:value={userLoginDto.email} class="form-control" id="email" placeholder="test@gmail.com">
    <div class="text-danger">{userLoginResult instanceof ErrorApiResponse ? userLoginResult?.T_errors?.email ?? "" : ""}</div>
</div>
<div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" bind:value={userLoginDto.password} class="form-control" id="password" placeholder="********">
    <div class="text-danger">{userLoginResult instanceof ErrorApiResponse ? userLoginResult?.T_errors?.password ?? "" : ""}</div>
</div>

{#if userLoginResult instanceof ErrorApiResponse}
    <div class="text-danger mb-3">{userLoginResult.message}</div>
{/if}

<div class="my-3">
    <Button class="btn btn-link" style="padding: 0" onClick={() => {changeRoute(routes.forgotPassword, undefined)}}>Забыли пароль?</Button>
</div>

<Button class="btn btn-outline-primary" onClick={() => {changeRoute(routes.register, undefined)}}>Зарегистрироваться</Button>
<Button class="btn btn-primary" onClick={login}>Войти</Button>

