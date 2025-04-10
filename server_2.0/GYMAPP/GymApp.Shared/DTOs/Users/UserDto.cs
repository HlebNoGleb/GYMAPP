using GymApp.Shared.Enums;
using System.ComponentModel.DataAnnotations;


namespace GymApp.Shared.DTOs;

public class UserDto : BasicUserDto
{
    public string Test { get; set; } = "123";
}