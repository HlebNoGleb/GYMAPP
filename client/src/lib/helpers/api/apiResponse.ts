export class BaseApiResponse {
    success: boolean
    message: string

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
    }
}

export class ApiResponse<T> implements BaseApiResponse {
    success: boolean
    message: string
    data: T

    constructor(success: boolean, message: string, data: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export class ErrorApiResponse<T> implements BaseApiResponse {
    success: boolean
    message: string
    errors: ApiError[]
    T_errors: T
    constructor(success: boolean, message: string, errors: ApiError[]) {
        this.success = success;
        this.message = message;
        this.errors = errors;
        this.T_errors = {} as T;
    }
}

class ApiError {
    key: string
    value: string

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export function handleErrors(response: any) {
    if (response instanceof ErrorApiResponse) {
        if (response.errors && response.errors.length > 0) {
            response.errors.forEach(item => {
                response.T_errors[item.key.charAt(0).toLowerCase() + item.key.slice(1)] = item.value;
            });
        }

        return response;
    }

    return response;
}