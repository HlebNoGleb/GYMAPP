using GymApp.Shared.DTOs;
using GymApp.Shared.Models.Users;

namespace GymApp.Shared.Models;

public class AuthResponse(BasicUserDto basicUserDto, UserTokens tokens)
{
    public BasicUserDto BasicUser { get; set; } = basicUserDto;
    public UserTokens Tokens { get; set; } = tokens;
}