<script lang="ts">
    import { ErrorApiResponse } from "../../../../../helpers/api/apiResponse";
    import routes, { changeRoute } from "../../../../../helpers/routes";
    import { UserRegister, UserRegisterDto } from "../../../../../helpers/storage/User/userRegister";
    import Button from "../../../../common/button.svelte";


    let userRegisterDto: UserRegisterDto = new UserRegisterDto("test2", "hlebnogleb@gmail.com", "1223334444");

    let userRegisterResult: string | ErrorApiResponse<UserRegisterDto>;

    async function register() {
        const userRegister = new UserRegister(userRegisterDto);
        userRegisterResult = await userRegister.register();

        if (userRegisterResult instanceof ErrorApiResponse && userRegisterResult.errors.length == 0) {
            throw new Error(userRegisterResult.message);
        }
    }

</script>

<h1>Регистрация</h1>
<div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" bind:value={userRegisterDto.name} class="form-control" id="name" placeholder="Test Testov">
    <div class="text-danger">{userRegisterResult instanceof ErrorApiResponse ? userRegisterResult?.T_errors?.name ?? "" : ""}</div>
</div>
<div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" bind:value={userRegisterDto.email} class="form-control" id="email" placeholder="test@gmail.com">
    <div class="text-danger">{userRegisterResult instanceof ErrorApiResponse ? userRegisterResult?.T_errors?.email ?? "" : ""}</div>
</div>
<div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" bind:value={userRegisterDto.password} class="form-control" id="password" placeholder="********">
    <div class="text-danger">{userRegisterResult instanceof ErrorApiResponse ? userRegisterResult?.T_errors?.password ?? "" : ""}</div>
</div>

{#if userRegisterResult instanceof ErrorApiResponse && userRegisterResult.errors.length > 0}
    <div class="text-danger mb-3">{userRegisterResult.message}</div>
{/if}

{#if typeof userRegisterResult === "string"}
    <div class="text-success mb-3">{userRegisterResult}</div>
{/if}

<Button class="btn btn-outline-primary" onClick={() => {changeRoute(routes.login, undefined)}}>Войти</Button>
<Button class="btn btn-primary" onClick={register}>Зарегистрироваться</Button>