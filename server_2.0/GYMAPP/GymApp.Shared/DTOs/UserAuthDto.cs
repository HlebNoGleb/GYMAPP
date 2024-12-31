﻿using System.ComponentModel.DataAnnotations;

namespace GymApp.Shared.DTOs;

public class UserAuthDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }
    
    [Required(ErrorMessage = "Email is required")] 
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
    
    [Required(ErrorMessage = "Password is required")] 
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
    public string Password { get; set; }
}