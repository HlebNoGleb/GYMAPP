using GymApp.Shared.DTOs;
using GymApp.Shared.Models.Users;

namespace GymApp.Shared.Models;

public class AuthResponse(UserDto userDto, UserTokens tokens)
{
    public UserDto User { get; set; } = userDto;
    public UserTokens Tokens { get; set; } = tokens;
}