using System.ComponentModel.DataAnnotations.Schema;
using GymApp.Shared.Models.Users;

namespace GymApp.Shared.Models;

using System;

public class RefreshToken
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Token { get; set; }
    public DateTime Expiration { get; set; }

    // Навигационное свойство для связи с пользователем (необязательно)
    public User User { get; set; }
}