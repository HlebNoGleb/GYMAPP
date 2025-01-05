using GymApp.Shared.Models;

namespace GymApp.API.Models;

public class ApiResponse(bool success, string message)
{
    public bool Success { get; set; } = success;
    public string Message { get; set; } = message;
}

public class PaginationMetadata(int totalItems, int pageSize, int currentPage)
{
    public int TotalItems { get; set; } = totalItems;
    public int PageSize { get; set; } = pageSize;
    public int CurrentPage { get; set; } = currentPage;
    public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);
}

public class ApiResponse<T>(string message, T data = default, PaginationMetadata pagination = null) : ApiResponse(true, message)
{
    public T Data { get; set; } = data;
    public PaginationMetadata Pagination { get; set; } = pagination;
}

public class ErrorApiResponse(string message, List<ApiError> errors = null) : ApiResponse(false, message)
{
    public List<ApiError> Errors { get; set; } = errors;
}