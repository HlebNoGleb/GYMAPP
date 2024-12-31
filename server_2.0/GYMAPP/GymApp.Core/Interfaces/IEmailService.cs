using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;

namespace GymApp.Core.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, object body);
    Task SendPasswordResetEmailAsync(ResetPasswordSendMail resetPasswordSendMail);
}