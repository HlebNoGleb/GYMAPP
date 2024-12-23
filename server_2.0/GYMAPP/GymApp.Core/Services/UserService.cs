using AutoMapper;
using GymApp.Core.Interfaces;
using GymApp.Shared.DTOs;
using GymApp.Shared.Models;

namespace GymApp.Core.Services;

public class UserService(IUserRepository userRepository, IMapper mapper, TokenService tokenService)
{

    public async Task AddUserAsync(UserAuthDto user)
    {
        var newUser = mapper.Map<User>(user);

        await userRepository.AddAsync(newUser);
    }
    public async Task<UserDto?> AuthenticateAsync(UserLoginDto loginDto)
    {
        var user = await userRepository.GetByEmailAndPasswordAsync(loginDto.Email, loginDto.Password);
        if (user == null)
        {
            return null;
        }

        var token = tokenService.GenerateToken(user);
        var userDto = mapper.Map<UserDto>(user);
        userDto.Token = token;

        return userDto;
    }
    
    public async Task<UserDto?> GetUserByIdAsync(int userId)
    {
        var user = await userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            return null;
        }

        var userDto = mapper.Map<UserDto>(user);
        return userDto;
    }

    // Другие методы для работы с пользователями
    public async Task<List<User>> GetAllUsersAsync()
    {
        var users = await userRepository.GetAllAsync();
        return users;
    }
}
