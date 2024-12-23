using System.Security.Claims;
using GymApp.Core.Services;
using GymApp.Shared.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace GymApp.API;

public static class Routes
{
    public static void RegisterRoutes(this WebApplication webApplication)
    {
        webApplication.MapGet("/", () => "Hello World!");
        
        webApplication.MapGet("/users", async (UserService userService) =>
        {
            var users = await userService.GetAllUsersAsync();
            return Results.Ok(users);
        });

        webApplication.MapPost("/users/register", async (UserService userService, UserAuthDto user) =>
        {
            await userService.AddUserAsync(user);
            return Results.Ok();
        });
        
        webApplication.MapPost("/users/login", async (UserService userService, UserLoginDto loginDto) =>
        {
            var user = await userService.AuthenticateAsync(loginDto);
            return user is not null ? Results.Ok(user) : Results.Unauthorized();
        });

        webApplication.MapGet("/profile", [Authorize] async (UserService userService, ClaimsPrincipal user) =>
        {
            var userId = int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
            var userDto = await userService.GetUserByIdAsync(userId);
            return userDto is not null ? Results.Ok(userDto) : Results.NotFound();
        });
        
    }
} 
