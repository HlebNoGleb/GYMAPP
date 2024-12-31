using System.Security.Claims;
using GymApp.API.Helpers;
using GymApp.API.Models;
using GymApp.Core.Interfaces;
using GymApp.Core.Services;
using GymApp.Shared.Consts;
using GymApp.Shared.DTOs;
using GymApp.Shared.Enums;
using GymApp.Shared.Exceptions;
using GymApp.Shared.Localization;
using GymApp.Shared.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.API.Endpoints.Users;

public static class UserRoutes
{
    public static void RegisterRoutes(this WebApplication app)
    {
        app.MapPost("/users/register", async (UserService userService, UserAuthDto user) =>
            {
                var isValid = ValidationHelper.Validate(user, out var validationResults);

                if (!isValid) throw new ValidationException(validationResults);

                var newUser = await userService.AddUserAsync(user);

                await userService.SendConfirmationEmailAsync(newUser);

                return Results.Ok(new ApiResponse(true,
                    ResourceHelper.GetResource(ResourceHelper.ErrorResourceManager, "ConfirmSuccessRegistration")));
            })
            .WithTags("Users");

        app.MapGet($"/{Consts.CONFIRM_EMAIL_ROUTE}", async (UserService userService, string token) =>
            {
                var result = await userService.ConfirmEmailAsync(token);
                return result
                    ? Results.Ok("Email confirmed successfully.")
                    : Results.BadRequest("Invalid token or token expired.");
            })
            .WithTags("Users");

        app.MapPost("/users/login", async (UserService userService, UserLoginDto loginDto) =>
            {
                var isValid = ValidationHelper.Validate(loginDto, out var validationResults);
                if (!isValid) throw new ValidationException(validationResults);

                var authResponse = await userService.AuthenticateAsync(loginDto);
                return authResponse is not null ? Results.Ok(authResponse) : Results.Unauthorized();
            })
            .WithTags("Users");

        app.MapGet("/profile", [Authorize(Policy = "AllRolesPolicy")]
                async (UserService userService, ClaimsPrincipal user) =>
                {
                    // check expiration
                    var claimNameIdentifier = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    var userId = Guid.Parse(claimNameIdentifier ?? string.Empty);
                    var userDto = await userService.GetUserByIdAsync(userId);
                    return userDto is not null ? Results.Ok(userDto) : Results.NotFound();
                })
            .WithTags("Users");

        app.MapPost("/refresh-token", async (TokenService tokenService, string refreshToken) =>
            {
                var token = await tokenService.GetRefreshTokenAsync(refreshToken);
                if (token is null) return Results.Unauthorized();

                if (token.Expiration < DateTime.UtcNow) return Results.Unauthorized();

                var tokens = tokenService.GenerateTokens(token.User);

                // update refresh token
                token.Token = tokens.RefreshToken;
                token.Expiration = tokens.RefreshExpiration;

                await tokenService.UpdateRefreshTokenAsync(token);

                return Results.Ok(tokens);
            })
            .WithTags("Users");

        app.MapPost("/request-password-reset", [Authorize(Policy = "AllRolesPolicy")] async (
                [FromServices] UserService userService, [FromServices] IEmailService emailService,
                [FromBody] UserRequestPasswordResetDto userRequestPasswordResetDto) =>
            {
                var user = await userService.GetUserByEmailAsync(userRequestPasswordResetDto.Email);

                if (user is not null)
                {
                    var resetPasswordSendMail = await userService.GeneratePasswordResetTokenAsync(user);
                    await emailService.SendPasswordResetEmailAsync(resetPasswordSendMail);
                }

                return Results.Ok(new
                    { Message = "If this email is registered, you will receive password reset instructions." });
            })
            .WithTags("Users");

        app.MapPost("/reset-password", [Authorize(Policy = "AllRolesPolicy")]
                async (ResetPasswordRequest request, UserService userService) =>
                {
                    var result = await userService.ResetPasswordAsync(request.Token, request.NewPassword);
                    return result
                        ? Results.Ok(new { Message = "Password has been reset successfully." })
                        : Results.BadRequest(new { Message = "Invalid or expired token." });
                })
            .WithTags("Users");

        app.MapPost("/change-password", [Authorize(Policy = "AllRolesPolicy")]
                async (ChangePasswordRequest request, UserService userService) =>
                {
                    var result = await userService.ChangePasswordAsync(request);
                    return result
                        ? Results.Ok(new { Message = "Password has been changed successfully." })
                        : Results.BadRequest(new { Message = "Invalid or expired token." });
                })
            .WithTags("Users");

        app.MapGet("/users/{userId}", [Authorize(Policy = "AllRolesPolicy")]
                async (UserService userService, Guid userId) =>
                {
                    var user = await userService.GetUserByIdAsync(userId);
                    return user is not null ? Results.Ok(user) : Results.NotFound();
                })
            .WithTags("Users");

        app.MapDelete("/users/{userId}", [Authorize(Policy = "AllRolesPolicy")]
                async (UserService userService, Guid userId, HttpContext context) =>
                {
                    var user = context.User;

                    if (user.Identity != null && !user.Identity.IsAuthenticated) return Results.Unauthorized();

                    var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                    var userRoleClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

                    if (userRoleClaim == UserRoles.Administrator.ToString() || userIdClaim == userId.ToString())
                    {
                        var result = await userService.DeleteUserAsync(userId);
                        return result
                            ? Results.Ok(new { Message = "User has been deleted successfully." })
                            : Results.NotFound();
                    }

                    return Results.Unauthorized();
                })
            .WithTags("Users");

        app.MapGet("/users", async (UserService userService) =>
            {
                var users = await userService.GetAllUsersAsync();
                return Results.Ok(users);
            })
            .WithTags("Users");
    }
}