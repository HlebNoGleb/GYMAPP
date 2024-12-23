﻿using GymApp.Shared.Models;

namespace GymApp.Core.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByEmailAndPasswordAsync(string email, string password);
    Task<User> AddAsync(User? user);
    Task UpdateAsync(User? user);
    Task DeleteAsync(int id);
    Task SaveChangesAsync();
    Task<List<User>> GetAllAsync();
}
