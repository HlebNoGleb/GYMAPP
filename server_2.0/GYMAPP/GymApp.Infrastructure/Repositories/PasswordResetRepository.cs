using GymApp.Core.Interfaces;
using GymApp.Infrastructure.DbContextModels;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Infrastructure.Repositories;

public class PasswordResetRepository(ApplicationDbContext context) : IPasswordResetRepository
{
    public async Task AddAsync(UserPasswordReset passwordReset)
    {
        var oldPasswordReset = await context.PasswordResets.FirstOrDefaultAsync(x=>x.UserId == passwordReset.UserId);
        
        if (oldPasswordReset is not null)
        {
            context.PasswordResets.Remove(oldPasswordReset);
        }
        
        context.PasswordResets.Add(passwordReset);
        await context.SaveChangesAsync();
    }

    public async Task<UserPasswordReset?> GetByTokenAsync(string requestToken)
    {
        return await context.PasswordResets.FirstOrDefaultAsync(x => x.PasswordResetToken == requestToken);
    }
}