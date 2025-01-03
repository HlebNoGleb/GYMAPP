using System.Security.Claims;
using GymApp.API;
using GymApp.API.ExceptionHandlers;
using GymApp.API.Middleware;
using GymApp.Core.Interfaces;
using GymApp.Core.Mappers;
using GymApp.Core.Services;
using GymApp.Infrastructure.DbContextModels;
using GymApp.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddScoped<ApplicationDbContext, ApplicationDbContext>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"));
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITokensRepository, TokensRepository>();
builder.Services.AddScoped<IPasswordResetRepository, PasswordResetRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TokenService>();

builder.Services.AddAutoMapper(typeof(MapperProfile));

builder.Services.AddAuthorization(); 
builder.Services.RegisterServices(builder.Configuration);


var app = builder.Build();

app.UseMiddleware<CustomAuthorizationMiddleware>();

app.UseAuthentication(); 
app.UseAuthorization();

app.UseRequestLocalization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
}

app.UseHttpsRedirection();

app.UseExceptionHandler(error =>
{
    error.Run(async context => { await ExceptionHandler.Handle(context); });
});

app.RegisterRoutes();

app.Run();