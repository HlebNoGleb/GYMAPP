import { ApiResponse, BaseApiResponse, ErrorApiResponse, handleErrors } from "../../api/apiResponse";
import { apiService } from "../../api/requestService";
import config from "../../configs/config";
import { AuthResponseDto, BasicUserDto } from "./basicUserDto";

interface IUserRegisterDto {
    name: string;
    email: string;
    password: string;
}

export class UserRegisterDto implements IUserRegisterDto {
    name: string;
    email: string;
    password: string;
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

interface IUserRegisterStrategy {
    register(userRegisterDto: UserRegisterDto): Promise<BaseApiResponse | ErrorApiResponse<UserRegisterDto>>;
}

class LocalRegisterStrategy implements IUserRegisterStrategy {
    async register(userRegisterDto: UserRegisterDto): Promise<BaseApiResponse | ErrorApiResponse<UserRegisterDto>> {
        throw new Error("LocalRegisterStrategy is not available");
    }
}

class ServerRegisterStrategy implements IUserRegisterStrategy {
    async register(userRegisterDto: UserRegisterDto): Promise<BaseApiResponse | ErrorApiResponse<UserRegisterDto>> {
        return await apiService.post("/users/register", userRegisterDto);
    }
}

export class UserRegister {
    userRegisterDto: UserRegisterDto;
    private strategy: IUserRegisterStrategy;

    constructor(userRegisterDto: UserRegisterDto) {
        this.userRegisterDto = userRegisterDto;
        this.strategy = config.useServer2 ? new ServerRegisterStrategy() : new LocalRegisterStrategy();
    }

    async register(): Promise<string | ErrorApiResponse<UserRegisterDto>> {
        const response = await this.strategy.register(this.userRegisterDto);

        const handleResult = handleErrors(response);

        if (handleResult instanceof ErrorApiResponse) {
            return handleResult;
        }

        if (handleResult instanceof BaseApiResponse) {
            return handleResult.message;
        }

        return handleResult;
    }
}