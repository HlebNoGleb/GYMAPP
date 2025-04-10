using GymApp.Shared.Models;

namespace GymApp.API.Models;

public class ApiResponse(bool success, string message)
{
    public bool Success { get; set; } = success;
    public string Message { get; set; } = message;
}

public class ApiResponse<T>(string message, T data = default) : ApiResponse(true, message)
{
    public T Data { get; set; } = data;
}

public class ErrorApiResponse(string message, List<ApiError> errors = null) : ApiResponse(false, message)
{
    public List<ApiError> Errors { get; set; } = errors;
}