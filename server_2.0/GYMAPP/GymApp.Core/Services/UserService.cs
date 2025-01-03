using AutoMapper;
using GymApp.Core.Interfaces;
using GymApp.Shared.Consts;
using GymApp.Shared.DTOs;
using GymApp.Shared.Enums;
using GymApp.Shared.Exceptions;
using GymApp.Shared.Helpers;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;
using Microsoft.Extensions.Configuration;

namespace GymApp.Core.Services;

public class UserService(
    IUserRepository userRepository,
    ITokensRepository tokensRepository,
    IPasswordResetRepository passwordResetRepository,
    IConfiguration configuration,
    IMapper mapper,
    TokenService tokenService,
    IEmailService emailService)
{
    public async Task<User> AddUserAsync(UserAuthDto user)
    {
        var newUser = mapper.Map<User>(user);
        
        newUser.PasswordHash = HashHelper.HashPassword(user.Password);
        newUser.Id = new Guid();
        newUser.Role = UserRoles.User;

        newUser.EmailConfirmation = new UserEmailConfirmation
        {
            IsEmailConfirmed = false,
            EmailConfirmationToken = tokenService.GenerateRngBase64Token(),
            EmailConfirmationTokenExpiration = DateTime.Now.AddDays(1)
        };

        await userRepository.AddAsync(newUser);

        return newUser;
    }

    public async Task<AuthResponse?> AuthenticateAsync(UserLoginDto loginDto)
    {
        // check user
        var user = await userRepository.GetByEmailAndPasswordAsync(loginDto.Email, loginDto.Password);
        if (user == null) return null;
        
        if (!user.EmailConfirmation.IsEmailConfirmed)
        {
            throw new EmailNotConfirmedException();
        }
        
        // generate tokens
        var tokens = tokenService.GenerateTokens(user);
        var userDto = mapper.Map<BasicUserDto>(user);
        
        var authResponse = new AuthResponse(userDto, tokens);
        
        // save refresh token to db
        
        var refreshToken = new RefreshToken
        {
            Token = tokens.RefreshToken,
            Expiration = tokens.RefreshExpiration,
            User = user,
            UserId = user.Id,
            Id = new Guid(),
        };

        await tokenService.AddRefreshTokenAsync(refreshToken);

        return authResponse;
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid userId)
    {
        var user = await userRepository.GetByIdAsync(userId);
        if (user == null) return null;

        var userDto = mapper.Map<UserDto>(user);
        return userDto;
    }

    public async Task<List<BasicUserDto>> GetAllConfirmedUsersAsync()
    {
        var users = await userRepository.GetAllConfirmedAsync();

        var usersDto = mapper.Map<List<BasicUserDto>>(users);
        return usersDto;
    }

    public async Task SendConfirmationEmailAsync(User user, ClientType clientType)
    {
        var url = configuration.GetSection("AppSettings:BackendUrl").Value;

        url = clientType switch
        {
            ClientType.Web => configuration.GetSection("AppSettings:FrontendUrl").Value,
            ClientType.Ios => configuration.GetSection("AppSettings:FrontendUrl").Value,
            ClientType.Android => configuration.GetSection("AppSettings:FrontendUrl").Value,
            _ => url
        };

        await emailService.SendEmailAsync(new
        {
            to_name = user.Name,
            message = "Please confirm your email, by clicking on the link",
            // url = $"{url}/{Consts.CONFIRM_EMAIL_ROUTE}/?token={user.EmailConfirmation.EmailConfirmationToken}"
            url = $"{url}/confirmEmail?token={user.EmailConfirmation.EmailConfirmationToken}"
            // todo change /confirmEmail to #confirmEmail and fix client side
        }, new
        {
            service_id = configuration.GetSection("EmailSettings:EmailJS:ServiceId").Value,
            template_id = configuration.GetSection("EmailSettings:EmailJS:EmailConfirmationTemplateId").Value,
            user_id = configuration.GetSection("EmailSettings:EmailJS:UserId").Value,
        });
    }

    public async Task<bool> ConfirmEmailAsync(string token)
    {
        var user = await userRepository.GetByEmailTokenAsync(token);
        
        if (user == null)
        {
            // || user.EmailConfirmation.IsEmailConfirmed 
            // || user.EmailConfirmationTokenExpiration < DateTime.UtcNow
            return false;
        }

        if (user.EmailConfirmation.IsEmailConfirmed)
        {
            return true;
        }

        user.EmailConfirmation.IsEmailConfirmed = true;
        //user.EmailConfirmationToken = string.Empty;
        //user.EmailConfirmationTokenExpiration = null;
        await userRepository.UpdateAsync(user);
        
        return true;
    }
    
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await userRepository.GetByEmailAsync(email);
    }

    public async Task GeneratePasswordResetTokenAsync(User user, ClientType clientType)
    {
        var userPasswordReset = new UserPasswordReset
        {
            UserId = user.Id,
            PasswordResetToken = tokenService.GenerateRngBase64Token(),
            PasswordResetTokenExpiration = DateTime.Now.AddDays(1)
        };
        
        await passwordResetRepository.AddAsync(userPasswordReset);
        
        var url = configuration.GetSection("AppSettings:BackendUrl").Value;

        url = clientType switch
        {
            ClientType.Web => configuration.GetSection("AppSettings:FrontendUrl").Value,
            ClientType.Ios => configuration.GetSection("AppSettings:FrontendUrl").Value,
            ClientType.Android => configuration.GetSection("AppSettings:FrontendUrl").Value,
            _ => url
        };
        
        await emailService.SendEmailAsync(new
        {
            to_name = user.Name,
            message = "You can reset uour password by press this link",
            url = $"{url}/resetPassword?token={userPasswordReset.PasswordResetToken}"
            // todo change /resetPassword to #resetPassword and fix client side
        }, new
        {
            service_id = configuration.GetSection("EmailSettings:EmailJS:ServiceId").Value,
            template_id = configuration.GetSection("EmailSettings:EmailJS:PasswordResetTemplateId").Value,
            user_id = configuration.GetSection("EmailSettings:EmailJS:UserId").Value,
        });
    }

    public async Task<bool> ResetPasswordAsync(string requestToken, string requestNewPassword)
    {
        var userPasswordReset = await passwordResetRepository.GetByTokenAsync(requestToken);

        if (userPasswordReset is null) return false;
        
        var user = await userRepository.GetByIdAsync(userPasswordReset.UserId);
        if (user is null) return false;
        
        // todo - remove PasswordResets from DB
        
        user.PasswordHash = HashHelper.HashPassword(requestNewPassword);
        await userRepository.UpdateAsync(user);
        
        return true;
    }

    public async Task<bool> ChangePasswordAsync(ChangePasswordRequest request)
    {
        var user = await userRepository.GetByIdAsync(request.UserId);
        if (user is null) return false;
        
        if (!HashHelper.VerifyPassword(request.Password, user.PasswordHash)) return false;
        
        user.PasswordHash = HashHelper.HashPassword(request.NewPassword);
        await userRepository.UpdateAsync(user);
        
        return true;
    }

    public async Task<bool> DeleteUserAsync(Guid userId)
    {
        var user = await userRepository.GetByIdAsync(userId);
        if (user is null) return false;
        
        await userRepository.DeleteAsync(userId);
        
        return true;
    }
}