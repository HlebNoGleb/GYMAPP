export class BasicUserDto {
    id: string;
    name: string;
    email: string;
    role: number;

    constructor(id: string, name: string, email: string, role: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

export class UserTokens{
    token: string;
    refreshToken: string;
    expiration: string;
    refreshExpiration: string;
}

export class AuthResponseDto {
    tokens: UserTokens;
    user: BasicUserDto;
}