using GymApp.Shared.Models.Users;

namespace GymApp.Shared.Models.Friends;

public class Friendship
{
    public Guid User1Id { get; set; } 
    public Guid User2Id { get; set; }
    
    public User User1 { get; set; }
    public User User2 { get; set; }
}