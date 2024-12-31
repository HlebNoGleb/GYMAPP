namespace GymApp.Shared.Exceptions;

public class EmailNotConfirmedException : Exception
{
  
  public string Token { get; set; }

  public EmailNotConfirmedException(string message, string token) : base(message)
  {
    Token = token;
  }

  public EmailNotConfirmedException(string message) : base(message)
  {
    
  }
  
  public EmailNotConfirmedException() : base("Email not confirmed")
  {
    
  }
}