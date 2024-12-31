namespace GymApp.Shared.Models.Users;

public class ChangePasswordRequest
{
    public string Password { get; set; }
    public string NewPassword { get; set; }

    public string ConfirmPassword { get; set; }
    public Guid UserId { get; set; }
}
