using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GymApp.Shared.Enums;
using GymApp.Shared.Models.Friends;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Shared.Models.Users;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    
    [Required] 
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public UserRoles Role { get; set; }
    
    [DefaultValue(UserVisibility.Public)] // private (1) почему то не сработало и default в миграции addUserVisibility выставился 0
    public UserVisibility Visibility { get; set; }
    
    public IEnumerable<RefreshToken> RefreshTokens { get; set; }
    
    public UserEmailConfirmation EmailConfirmation { get; set; }
    
    public UserPasswordReset PasswordReset { get; set; }
    
    public ICollection<FriendshipRequest> FriendRequestsSent { get; set; }
    public ICollection<FriendshipRequest> FriendRequestsReceived { get; set; }
    
}