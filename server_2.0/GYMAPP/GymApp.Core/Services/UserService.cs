using AutoMapper;
using GymApp.Core.Interfaces;
using GymApp.Shared.DTOs;

namespace GymApp.Core.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly TokenService _tokenService;

    public UserService(IUserRepository userRepository, IMapper mapper, TokenService tokenService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task<UserDto> AuthenticateAsync(UserLoginDto loginDto)
    {
        var user = await _userRepository.GetByEmailAndPasswordAsync(loginDto.Email, loginDto.Password);
        if (user == null)
        {
            return null;
        }

        var token = _tokenService.GenerateToken(user);
        var userDto = _mapper.Map<UserDto>(user);
        userDto.Token = token;

        return userDto;
    }

    // Другие методы для работы с пользователями
}
