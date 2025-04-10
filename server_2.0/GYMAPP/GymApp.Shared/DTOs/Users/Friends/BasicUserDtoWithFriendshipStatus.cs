using GymApp.Shared.Enums;

namespace GymApp.Shared.DTOs.Users.Friends;

public class BasicUserDtoWithFriendshipStatus
{
    public BasicUserDto User { get; set; }
    public FriendshipStatus Status { get; set; }
}