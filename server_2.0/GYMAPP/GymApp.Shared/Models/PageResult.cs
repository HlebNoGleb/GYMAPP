namespace GymApp.Shared.Models;

public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageSize { get; set; } = 10;
    public int CurrentPage { get; set; }    
    
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}

