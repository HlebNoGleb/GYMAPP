using GymApp.Shared.Models.Users;

namespace GymApp.Shared.Models.Friends;

public class FriendshipRequest
{
    public Guid FromUserId { get; set; } 
    public Guid ToUserId { get; set; }
    
    public User FromUser { get; set; }
    public User ToUser { get; set; }
}