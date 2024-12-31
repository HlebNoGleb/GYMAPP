using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GymApp.Shared.Enums;
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
    
    public IEnumerable<RefreshToken> RefreshTokens { get; set; }
    
    public UserEmailConfirmation EmailConfirmation { get; set; }
    
    public UserPasswordReset PasswordReset { get; set; }
}