using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;

namespace GymApp.Core.Interfaces;

public interface IPasswordResetRepository
{
    Task AddAsync(UserPasswordReset passwordReset);
    Task<UserPasswordReset?> GetByTokenAsync(string requestToken);
}