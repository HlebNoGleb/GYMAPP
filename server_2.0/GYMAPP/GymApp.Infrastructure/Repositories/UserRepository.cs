using GymApp.Core.Interfaces;
using GymApp.Infrastructure.DbContextModels;
using GymApp.Shared.Helpers;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await context.Users.FirstOrDefaultAsync(x=>x.Id == id);
    }

    public async Task<User?> GetByEmailAndPasswordAsync(string email, string password)
    {
        var passwordHash = HashHelper.HashPassword(password);
        return await context.Users.Include(x=>x.EmailConfirmation)
            .FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == passwordHash);
    }

    public async Task AddAsync(User user)
    {
        await context.Users.AddAsync(user);
        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            var dbInnerException = ex.InnerException;
            ExeptionHelper.ThrowDbException(dbInnerException);
        }
    }

    public async Task UpdateAsync(User user)
    {
        context.Users.Update(user);
        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            var dbInnerException = ex.InnerException;
            ExeptionHelper.ThrowDbException(dbInnerException);
        }
    }

    public async Task DeleteAsync(Guid id)
    {
        var user = await context.Users.FindAsync(id);
        if (user != null) context.Users.Remove(user);
        await context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

    public Task<List<User>> GetAllAsync()
    {
        return context.Users.ToListAsync();
    }

    public Task<List<User>> GetAllConfirmedAsync()
    {
        return context.Users.Include(x=>x.EmailConfirmation).Where(x=>x.EmailConfirmation.IsEmailConfirmed).ToListAsync();
    }

    public async Task<User?> GetByEmailTokenAsync(string token)
    {
        return await context.Users.Include(x=>x.EmailConfirmation).FirstOrDefaultAsync(u => u.EmailConfirmation.EmailConfirmationToken == token);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}