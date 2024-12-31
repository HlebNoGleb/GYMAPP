using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Encodings.Web;
using GymApp.Core.Interfaces;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GymApp.Core.Services;

public class TokenService(IConfiguration configuration, ITokensRepository tokensRepository)
{
    public UserTokens GenerateTokens(User user)
    {
        var jwtSettings = configuration.GetSection("Jwt");
        var tokens = (GenerateToken(user), GenerateRefreshToken());
        return new UserTokens(tokens.Item1, GetExpirationDate(tokens.Item1), tokens.Item2, DateTime.Now.AddDays(double.Parse(jwtSettings["RefreshExpiryDays"] ?? "30")));
    }

    private string GenerateToken(User user)
    {
        var jwtSettings = configuration.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var expiry = DateTime.Now.AddMinutes(double.Parse(jwtSettings["ExpiryMinutes"]));
        
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(ClaimTypes.Expiration, ((DateTimeOffset)expiry).ToUnixTimeSeconds().ToString()),
        };

        var token = new JwtSecurityToken(
            jwtSettings["Issuer"],
            jwtSettings["Audience"],
            claims,
            expires: expiry,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRngBase64Token()
    {
        using var rng = new RNGCryptoServiceProvider();
        var tokenData = new byte[32];
        rng.GetBytes(tokenData);
        var base64Token = Convert.ToBase64String(tokenData);
        
        var urlSafeToken = base64Token.Replace("+", "-") .Replace("/", "_") .Replace("=", "");

        return urlSafeToken;
    }

    private string GenerateRefreshToken()
    {
        return GenerateRngBase64Token();
    }

    public DateTime GetExpirationDate(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadJwtToken(token);
        return jsonToken.ValidTo;
    }

    public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken)
    {
        return await tokensRepository.GetRefreshTokenAsync(refreshToken);
    }
    
    public async Task AddRefreshTokenAsync(RefreshToken refreshToken)
    {
        await tokensRepository.AddRefreshTokenAsync(refreshToken);
    }
    
    public async Task UpdateRefreshTokenAsync(RefreshToken refreshToken)
    {
        await tokensRepository.UpdateRefreshTokenAsync(refreshToken);
    }
}