namespace GymApp.API;

public static class Routes
{
    public static void RegisterRoutes(this WebApplication webApplication)
    {
        webApplication.MapGet("/", () => "Hello World!");
    }

}