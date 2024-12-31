namespace GymApp.API.Helpers;

using System.ComponentModel.DataAnnotations;

public static class ValidationHelper
{
    public static bool Validate(object obj, out List<ValidationResult> validationResults)
    {
        var validationContext = new ValidationContext(obj);
        validationResults = new List<ValidationResult>();
        return Validator.TryValidateObject(obj, validationContext, validationResults, true);
    }
}
