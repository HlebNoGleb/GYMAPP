using System.Security.Claims;
using GymApp.API.Endpoints.Users;
using GymApp.API.Helpers;
using GymApp.API.Models;
using GymApp.Core.Interfaces;
using GymApp.Core.Services;
using GymApp.Shared.Consts;
using GymApp.Shared.DTOs;
using GymApp.Shared.Exceptions;
using GymApp.Shared.Localization;
using GymApp.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.API;

public static class Routes
{
    public static void RegisterRoutes(this WebApplication webApplication)
    {
        webApplication.MapGet("/", () => "Hello World!");
        UserRoutes.RegisterRoutes(webApplication);

        
    }
}