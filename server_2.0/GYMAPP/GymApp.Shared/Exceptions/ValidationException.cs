using System.ComponentModel.DataAnnotations;
using GymApp.Shared.Models;

namespace GymApp.Shared.Exceptions;

public class ValidationException : Exception
{

  public List<ApiError> Errors { get; set; } = new List<ApiError>();
  
  public ValidationException(string message) : base(message)
  {
  }
  
  public ValidationException(List<ValidationResult> message) : base("Validation failed")
  {
    var errors = message.Select(vr => new ApiError(vr.MemberNames.FirstOrDefault(), vr.ErrorMessage)).ToList();
    Errors = errors;
  }

  private static string Join(List<ValidationResult> message)
  {
    return string.Join(", ", message.Select(vr => vr.ErrorMessage));
  }

  public ValidationException(string message, Exception innerException) : base(message, innerException)
  {
  }
}

