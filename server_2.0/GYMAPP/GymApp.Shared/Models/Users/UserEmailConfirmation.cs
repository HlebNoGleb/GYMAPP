namespace GymApp.Shared.Models.Users;

public class UserEmailConfirmation
{
    public Guid UserId { get; set; }
    public bool IsEmailConfirmed { get; set; } 
    public string EmailConfirmationToken { get; set; } 
    public DateTime? EmailConfirmationTokenExpiration { get; set; }
}