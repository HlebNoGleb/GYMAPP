import { ApiResponse, ErrorApiResponse, handleErrors } from "../../api/apiResponse";
import { apiService } from "../../api/requestService";
import { BasicUserDto } from "./basicUserDto";

export class UserDto extends BasicUserDto {
    test: string;
    constructor(id: string, name: string, email: string, role: number, test: string) {
        super(id, name, email, role);
        this.test = test;
    }

    static async getProfile(): Promise<UserDto> {
        const response = await apiService.get("/users/profile")

        const handleResult = handleErrors(response);

        if (handleResult instanceof ErrorApiResponse) {
            throw new Error(handleResult.message);
        }

        if (handleResult instanceof ApiResponse) {
            return new UserDto(handleResult.data.id, handleResult.data.name, handleResult.data.email, handleResult.data.role, handleResult.data.test);
        }

        return handleResult;
    }
}