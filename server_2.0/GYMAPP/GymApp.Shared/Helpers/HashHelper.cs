namespace GymApp.Shared.Helpers;

public static class HashHelper
{
    public static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password, "$2a$11$evkbz3ouUeAOhPbrzHPrAe");
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}