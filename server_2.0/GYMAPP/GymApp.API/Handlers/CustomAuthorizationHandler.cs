using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GymApp.API.Models;
using GymApp.Shared.Localization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.IdentityModel.Tokens;

namespace GymApp.API.Handlers;

public class CustomAuthorizationHandler : AuthorizationHandler<RolesAuthorizationRequirement>
{
    private readonly string _key;
    private readonly ILogger<CustomAuthorizationHandler> _logger;

    public CustomAuthorizationHandler(string key, ILogger<CustomAuthorizationHandler> logger)
    {
        _key = key;
        _logger = logger;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        RolesAuthorizationRequirement requirement)
    {
        var httpContext = context.Resource as HttpContext;
        if (httpContext == null)
        {
            context.Fail();
            return Task.CompletedTask;
        }

        var authHeader = httpContext.Request.Headers["Authorization"].FirstOrDefault();

        var token = authHeader.Substring("Bearer ".Length).Trim();
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_key);

        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out var validatedToken);

            if (validatedToken is JwtSecurityToken jwtToken)
            {
                var userRoles = jwtToken.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();

                if (requirement.AllowedRoles.Any(role => userRoles.Contains(role)))
                {
                    context.Succeed(requirement);
                }
                else
                {
                    httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                    httpContext.Response.ContentType = "application/json";
                    var responseModel = new ErrorApiResponse( ResourceHelper.GetResource(ResourceHelper.ErrorResourceManager, "NoRequiredRole"));
                    httpContext.Response.WriteAsJsonAsync(responseModel);
                }
            }
        }
        catch (SecurityTokenExpiredException)
        {
            httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            httpContext.Response.ContentType = "application/json";
            var responseModel = new ErrorApiResponse("Token expired.");
            httpContext.Response.WriteAsJsonAsync(responseModel);
        }
        catch
        {
            httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            httpContext.Response.ContentType = "application/json";
            var responseModel = new ErrorApiResponse("Token validation failed.");
            httpContext.Response.WriteAsJsonAsync(responseModel);
        }

        return Task.CompletedTask;
    }
}