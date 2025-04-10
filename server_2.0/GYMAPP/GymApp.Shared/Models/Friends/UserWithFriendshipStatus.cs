using GymApp.Shared.DTOs;
using GymApp.Shared.Enums;
using GymApp.Shared.Models.Users;

namespace GymApp.Shared.Models.Friends;

public class UserWithFriendshipStatus
{
    public User User { get; set; }
    public FriendshipStatus Status { get; set; }
}