using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;

namespace GymApp.Core.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(dynamic body, dynamic settings);
}