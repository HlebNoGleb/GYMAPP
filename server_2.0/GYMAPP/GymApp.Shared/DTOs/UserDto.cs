using GymApp.Shared.Enums;
using System.ComponentModel.DataAnnotations;


namespace GymApp.Shared.DTOs;

public class UserDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public UserRoles Role { get; set; }
}