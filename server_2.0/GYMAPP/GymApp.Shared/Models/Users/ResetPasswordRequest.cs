using System.ComponentModel.DataAnnotations;

namespace GymApp.Shared.Models.Users;

public class ResetPasswordRequest
{
    public string Token { get; set; }
    
    [Required(ErrorMessage = "Password is required")] 
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
    public string NewPassword { get; set; }
}
