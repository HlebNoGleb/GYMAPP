namespace GymApp.Shared.Models.Users;

public class UserPasswordReset
{
    public Guid UserId { get; set; }
    public string PasswordResetToken { get; set; }
    public DateTime PasswordResetTokenExpiration { get; set; }
}