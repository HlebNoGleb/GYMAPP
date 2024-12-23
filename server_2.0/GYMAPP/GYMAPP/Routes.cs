namespace GYMAPP;

public static class Routes
{
    public static void RegisterRoutes(this WebApplication webApplication)
    {
        webApplication.MapGet("/weatherforecast", () => "HELLO WORLD");
    }

}