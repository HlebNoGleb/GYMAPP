using GymApp.Shared.Models;

namespace GymApp.Core.Interfaces;

public interface ITokensRepository
{
    Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken);

    Task AddRefreshTokenAsync(RefreshToken refreshToken);
    
    Task UpdateRefreshTokenAsync(RefreshToken refreshToken);
}