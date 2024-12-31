namespace GymApp.Shared.Models.Users;

public class UserTokens(string token, DateTime expiration, string refreshToken, DateTime refreshExpiration)
{
    public string Token { get; set; } = token;
    public DateTime Expiration { get; set; } = expiration;
    public string RefreshToken { get; set; } = refreshToken;
    public DateTime RefreshExpiration { get; set; } = refreshExpiration;

}