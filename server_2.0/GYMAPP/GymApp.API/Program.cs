using System.Text;
using GymApp.API;
using GymApp.API.DbContextModels;
using GymApp.Core.Interfaces;
using GymApp.Core.Mappers;
using GymApp.Core.Services;
using GymApp.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddScoped<ApplicationDbContext, ApplicationDbContext>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"));
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TokenService>();

// builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(typeof(MapperProfile));


builder.Services.AddAuthorization(); // Configure the HTTP request pipeline.
builder.Services.RegisterServices(builder.Configuration);



var app = builder.Build();

app.UseAuthentication(); 
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.RegisterRoutes();

app.Run();