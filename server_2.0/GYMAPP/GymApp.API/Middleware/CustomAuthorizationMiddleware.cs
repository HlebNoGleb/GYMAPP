using System.Security.Claims;

namespace GymApp.API.Middleware;

public class CustomAuthorizationMiddleware
{
  private readonly RequestDelegate _next;
  public CustomAuthorizationMiddleware(RequestDelegate next)
  {
    _next = next;
  }
  
  public async Task InvokeAsync(HttpContext context)
  {
    //check role
    await _next(context);
  }
}