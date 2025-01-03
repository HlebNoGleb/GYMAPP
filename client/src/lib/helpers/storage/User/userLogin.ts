import { tokenStore, userStore } from "../../../services/userStore";
import { ApiResponse, ErrorApiResponse, handleErrors } from "../../api/apiResponse";
import { apiService } from "../../api/requestService";
import config from "../../configs/config";
import routes, { changeRoute } from "../../routes";
import { AuthResponseDto, BasicUserDto } from "./basicUserDto";

interface IUserLoginDto {
    email: string;
    password: string;
}

export class UserLoginDto implements IUserLoginDto {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

}

interface LoginStrategy {
    login(userLoginDto: UserLoginDto): Promise<ApiResponse<AuthResponseDto>> | Promise<ErrorApiResponse<UserLoginDto>> ;
}

class ServerLoginStrategy implements LoginStrategy {
    async login(userLoginDto: UserLoginDto): Promise<ApiResponse<AuthResponseDto>> {
        return await apiService.post("/users/login", userLoginDto);
    }
}

class LocalLoginStrategy implements LoginStrategy {
    async login(userLoginDto: UserLoginDto): Promise<ApiResponse<AuthResponseDto>> {
        throw new Error("LocalLoginStrategy is not available");
    }
}

export class UserLogin {
    userLoginDto: UserLoginDto;
    private loginStrategy: LoginStrategy;
    constructor(userLoginDto: UserLoginDto) {
        this.userLoginDto = userLoginDto;
        this.loginStrategy = config.useServer2 ? new ServerLoginStrategy() : new LocalLoginStrategy();
    }

    async login(): Promise<BasicUserDto | ErrorApiResponse<UserLoginDto>> {
        const response = await this.loginStrategy.login(this.userLoginDto);

        const handleResult = handleErrors(response);

        if (handleResult instanceof ErrorApiResponse) {
            return handleResult;
        }

        if (handleResult instanceof ApiResponse) {
            userStore.set(handleResult.data.basicUser);
            tokenStore.set(handleResult.data.tokens);

            return new BasicUserDto(handleResult.data.basicUser.id, handleResult.data.basicUser.name, handleResult.data.basicUser.email, handleResult.data.basicUser.role);
        }

        return handleResult;
    }
}