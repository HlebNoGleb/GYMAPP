namespace GymApp.Shared.Models;

public class ApiError()
{
    public string Key { get; set; }
    public string Value { get; set; }

    public ApiError(string key, string value) : this()
    {
        Key = key;
        Value = value;
    }
}