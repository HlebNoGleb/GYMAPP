using System.Globalization;
using System.Text;
using GymApp.API.Handlers;
using GymApp.API.Models;
using GymApp.Shared.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Localization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace GymApp.API;

public static class Services
{
    public static void RegisterServices(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddSwagger();
        services.AddCultures();

        var jwtSettings = configuration.GetSection("Jwt");
        var key = jwtSettings["Key"];
        var keyBytes = Encoding.ASCII.GetBytes(key);

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"], ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("AllRolesPolicy",
                policy =>
                {
                    policy.Requirements.Add(new RolesAuthorizationRequirement(new[]
                    {
                        UserRoles.Administrator.ToString(), UserRoles.User.ToString(), UserRoles.Trainer.ToString()
                    }));
                });

            options.AddPolicy("UserPolicy",
                policy =>
                {
                    policy.Requirements.Add(new RolesAuthorizationRequirement(new[]
                        { UserRoles.Administrator.ToString(), UserRoles.User.ToString() }));
                });

            options.AddPolicy("TrainerPolicy",
                policy =>
                {
                    policy.Requirements.Add(new RolesAuthorizationRequirement(new[]
                        { UserRoles.Administrator.ToString(), UserRoles.Trainer.ToString() }));
                });
            
            
        });

        services.AddSingleton<IAuthorizationHandler>(sp =>
            new CustomAuthorizationHandler(key, sp.GetRequiredService<ILogger<CustomAuthorizationHandler>>()));
    }

    private static void AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(opt =>
        {
            opt.SwaggerDoc("v1", new OpenApiInfo { Title = "GymAppApi", Version = "v2" });
            opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "bearer"
            });

            opt.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });
    }

    private static void AddCultures(this IServiceCollection services)
    {
        var supportedCultures = new[] { new CultureInfo("en-US"), new CultureInfo("ru-RU") };
        services.Configure<RequestLocalizationOptions>(options =>
        {
            options.DefaultRequestCulture = new RequestCulture("en-US");
            options.SupportedCultures = supportedCultures;
            options.SupportedUICultures = supportedCultures;

            options.RequestCultureProviders.Insert(0, new CustomRequestCultureProvider(async context =>
            {
                var headers = context.Request.Headers;
                var cultureName = headers["Accept-Language"].ToString().Split(',').FirstOrDefault();

                if (!string.IsNullOrEmpty(cultureName)) return new ProviderCultureResult(cultureName, cultureName);

                // No culture found
                return null;
            }));
        });
    }
}