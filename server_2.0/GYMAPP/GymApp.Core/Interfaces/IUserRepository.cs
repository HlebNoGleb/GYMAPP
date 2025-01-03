using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;

namespace GymApp.Core.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id);
    Task<User?> GetByEmailAndPasswordAsync(string email, string password);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(Guid id);
    Task SaveChangesAsync();
    Task<List<User>> GetAllAsync();
    Task<List<User>> GetAllConfirmedAsync();
    Task<User?> GetByEmailTokenAsync(string token);
    Task<User?> GetByEmailAsync(string email);
}
