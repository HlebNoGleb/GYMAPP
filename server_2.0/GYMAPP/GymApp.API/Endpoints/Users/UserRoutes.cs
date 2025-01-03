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
using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.API.Endpoints.Users;

public static class UserRoutes
{
    public static void RegisterRoutes(this WebApplication app)
    {
        app.MapPost("/users/register", async (UserService userService, UserAuthDto user, HttpContext httpContext) =>
            {
                var isValid = ValidationHelper.Validate(user, out var validationResults);

                if (!isValid) throw new ValidationException(validationResults);

                var newUser = await userService.AddUserAsync(user);

                var clientTypeString = httpContext.Request.Headers["X-Client-Type"];
                var clientType = ClientType.Web;
                
                if (Enum.TryParse(clientTypeString, true, out ClientType parsedClientType))
                {
                    clientType = parsedClientType;
                }

                await userService.SendConfirmationEmailAsync(newUser, clientType);

                return Results.Ok(new ApiResponse(true,
                    ResourceHelper.GetResource(ResourceHelper.ErrorResourceManager, "ConfirmSuccessRegistration")));
            })
            .WithTags("Users");

        app.MapGet($"/users/{Consts.CONFIRM_EMAIL_ROUTE}", async (UserService userService, string token) =>
            {
                var result = await userService.ConfirmEmailAsync(token);
                return result
                    ? Results.Ok(new ApiResponse(true, "Email confirmed successfully."))
                    : Results.BadRequest(new ErrorApiResponse("Invalid token or token expired."));
            })
            .WithTags("Users");

        app.MapPost("/users/login", async (UserService userService, UserLoginDto loginDto) =>
            {
                var isValid = ValidationHelper.Validate(loginDto, out var validationResults);
                if (!isValid) throw new ValidationException(validationResults);

                var authResponse = await userService.AuthenticateAsync(loginDto);
                if (authResponse is null)
                {
                    throw new ValidationException("Invalid username or password");
                }

                return Results.Ok(new ApiResponse<AuthResponse>("auth success", authResponse));
            })
            .WithTags("Users");
        
        app.MapGet("/users/profile", [Authorize(Policy = "AllRolesPolicy")]
                async (UserService userService, HttpContext httpContext) =>
                {
                    // check expiration
                    var claimNameIdentifier = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    // return Results.Ok(new ApiResponse(true, claimNameIdentifier));
                    var userId = Guid.Parse(claimNameIdentifier ?? string.Empty);
                    var userDto = await userService.GetUserByIdAsync(userId);
                    return userDto is not null 
                        ? Results.Ok(new ApiResponse<UserDto>("auth success", userDto)) 
                        : Results.BadRequest(new ErrorApiResponse("user not found"));
                })
            .WithTags("Users");

        app.MapPost("/users/refresh-token", async (TokenService tokenService, string refreshToken) =>
            {
                // todo: return refresh token as cookie
                var token = await tokenService.GetRefreshTokenAsync(refreshToken);
                if (token is null)
                {
                    return Results.Unauthorized();
                }

                if (token.Expiration < DateTime.UtcNow) return Results.Unauthorized();

                var tokens = tokenService.GenerateTokens(token.User);

                // update refresh token
                token.Token = tokens.RefreshToken;
                token.Expiration = tokens.RefreshExpiration;

                await tokenService.UpdateRefreshTokenAsync(token);

                return Results.Ok(new ApiResponse<UserTokens>("", tokens));
            })
            .WithTags("Users");

        app.MapPost("/users/request-password-reset", async (
                [FromServices] UserService userService, [FromServices] IEmailService emailService,
                [FromBody] UserRequestPasswordResetDto userRequestPasswordResetDto, HttpContext httpContext) =>
            {
                var isValid = ValidationHelper.Validate(userRequestPasswordResetDto, out var validationResults);
                if (!isValid) throw new ValidationException(validationResults);
                
                var user = await userService.GetUserByEmailAsync(userRequestPasswordResetDto.Email);

                if (user is not null)
                {
                    var clientTypeString = httpContext.Request.Headers["X-Client-Type"];
                    var clientType = ClientType.Web;
                
                    if (Enum.TryParse(clientTypeString, true, out ClientType parsedClientType))
                    {
                        clientType = parsedClientType;
                    }
                    
                    await userService.GeneratePasswordResetTokenAsync(user, clientType);
                }

                return Results.Ok(new ApiResponse(true, "If this email is registered, you will receive password reset instructions."));
            })
            .WithTags("Users");

        app.MapPost("/users/reset-password",
                async (ResetPasswordRequest request, UserService userService) =>
                {
                    var isValid = ValidationHelper.Validate(request, out var validationResults);
                    if (!isValid) throw new ValidationException(validationResults);
                    
                    var result = await userService.ResetPasswordAsync(request.Token, request.NewPassword);
                    return result
                        ? Results.Ok(new ApiResponse(true, "Password has been reset successfully."))
                        : Results.BadRequest(new ErrorApiResponse("Invalid or expired token."));
                })
            .WithTags("Users");

        app.MapPost("/users/change-password", [Authorize(Policy = "AllRolesPolicy")]
                async (ChangePasswordRequest request, UserService userService) =>
                {
                    var result = await userService.ChangePasswordAsync(request);
                    return result
                        ? Results.Ok(new ApiResponse(true, "Password has been changed successfully."))
                        : Results.BadRequest(new ErrorApiResponse("Invalid or expired token."));
                })
            .WithTags("Users");

        app.MapGet("/users/{userId}", [Authorize(Policy = "AllRolesPolicy")]
                async (UserService userService, string userId) =>
                {
                    var user = await userService.GetUserByIdAsync(Guid.Parse(userId));
                    return user is not null ? Results.Ok(new ApiResponse<BasicUserDto>("auth success", user)) : Results.NotFound();
                })
            .WithTags("Users");

        app.MapDelete("/users/{userId}", [Authorize(Policy = "AllRolesPolicy")]
                async (UserService userService, string userId, HttpContext context) =>
                {
                    var user = context.User;
        
                    if (user.Identity != null && !user.Identity.IsAuthenticated) return Results.Unauthorized();
        
                    var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                    var userRoleClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
        
                    if (userRoleClaim == UserRoles.Administrator.ToString() || userIdClaim == userId.ToString())
                    {
                        var result = await userService.DeleteUserAsync(Guid.Parse(userId));
                        return result
                            ? Results.Ok(new ApiResponse(true, "User has been deleted successfully."))
                            : Results.NotFound();
                    }
        
                    return Results.Unauthorized();
                })
            .WithTags("Users");

        app.MapGet("/users", [Authorize(Policy = "AllRolesPolicy")] async (UserService userService) =>
            {
                var users = await userService.GetAllConfirmedUsersAsync();
                return Results.Ok(new ApiResponse<List<BasicUserDto>>("", users));
            })
            .WithTags("Users");
    }
}