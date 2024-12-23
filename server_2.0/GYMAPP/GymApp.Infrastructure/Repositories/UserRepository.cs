﻿using GymApp.API.DbContextModels;
using GymApp.Core.Interfaces;
using GymApp.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<User?> GetByIdAsync(int id)
    {
        var user = await context.Users.FindAsync(id);
        return user ?? null;
    }

    public async Task<User?> GetByEmailAndPasswordAsync(string email, string password)
    {
        return await context.Users
            .FirstOrDefaultAsync(u => u.Email == email && u.Password == password); // Замените на хэшированный пароль
    }

    public async Task<User> AddAsync(User? user)
    {
        user.Id = new Guid();
        var newUser = await context.Users.AddAsync(user);
        await context.SaveChangesAsync(default);
        return newUser.Entity;
    }

    public async Task UpdateAsync(User user)
    {
        context.Users.Update(user);
    }

    public async Task DeleteAsync(int id)
    {
        var user = await context.Users.FindAsync(id);
        if (user != null)
        {
            context.Users.Remove(user);
        }
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

    public Task<List<User>> GetAllAsync()
    {
        return context.Users.ToListAsync();
    }
}
