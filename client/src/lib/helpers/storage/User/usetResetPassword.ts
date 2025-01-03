import { BaseApiResponse, ErrorApiResponse, handleErrors } from "../../api/apiResponse";
import { apiService } from "../../api/requestService";

interface IUserRequestPasswordResetDto{
    email: string
}

interface IResetPasswordRequest{
    token: string,
    newPassword: string
}

export class UserRequestPasswordResetDto implements IUserRequestPasswordResetDto{
    email: string;
    constructor(email: string) {
        this.email = email;
    }

    async sendResetPasswordRequest(): Promise<string | ErrorApiResponse<UserRequestPasswordResetDto>> {
        const response = await apiService.post("/users/request-password-reset", this);

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

export class UserResetPasswordRequestDto implements IResetPasswordRequest{
    token: string;
    newPassword: string;
    constructor(token: string, newPassword: string) {
        this.token = token;
        this.newPassword = newPassword;
    }

    async resetPassword(): Promise<string | ErrorApiResponse<UserResetPasswordRequestDto>> {
        const response = await apiService.post("/users/reset-password", this);

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