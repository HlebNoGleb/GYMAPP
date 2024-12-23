using GymApp.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.API.DbContextModels;

public sealed class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        Database.EnsureCreatedAsync();
    }
    
    public DbSet<User> Users { get; set; }
}