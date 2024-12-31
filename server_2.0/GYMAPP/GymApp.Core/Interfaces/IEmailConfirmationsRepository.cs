using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;

namespace GymApp.Core.Interfaces;

public interface IEmailConfirmationsRepository
{
    Task AddAsync(UserEmailConfirmation emailConfirmation);
}