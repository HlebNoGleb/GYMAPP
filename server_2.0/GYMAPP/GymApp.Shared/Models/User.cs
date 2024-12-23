using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GymApp.Shared.Enums;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Shared.Models;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    
    [Required] 
    public string Email { get; set; }
    public string Password { get; set; }
    public UserRoles Role { get; set; }
}