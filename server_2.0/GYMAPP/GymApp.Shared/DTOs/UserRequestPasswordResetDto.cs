using System.ComponentModel.DataAnnotations;

namespace GymApp.Shared.DTOs;

public class UserRequestPasswordResetDto
{
    
    [Required(ErrorMessage = "Email is required")] 
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
}