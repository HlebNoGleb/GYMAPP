using GymApp.Core.Interfaces;
using GymApp.Infrastructure.DbContextModels;
using GymApp.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Infrastructure.Repositories;

public class TokensRepository(ApplicationDbContext applicationDbContext) : ITokensRepository
{
    public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken)
    {
        var refreshTokenEntity = await applicationDbContext.RefreshTokens.Include(r => r.User).FirstOrDefaultAsync(
            t => t.Token == refreshToken && t.Expiration > DateTime.UtcNow);
        
        return refreshTokenEntity;
    }

    public async Task AddRefreshTokenAsync(RefreshToken refreshToken)
    {
        var oldTokens = applicationDbContext.RefreshTokens
            .Where(x => x.User.Id == refreshToken.User.Id);

        if (oldTokens.Any())
        {
            applicationDbContext.RefreshTokens.RemoveRange(oldTokens);
        }
        
        await applicationDbContext.RefreshTokens.AddAsync(refreshToken);

        await applicationDbContext.SaveChangesAsync();
    }

    public Task UpdateRefreshTokenAsync(RefreshToken refreshToken)
    {
        applicationDbContext.RefreshTokens.Update(refreshToken);
        return applicationDbContext.SaveChangesAsync();
    }
}