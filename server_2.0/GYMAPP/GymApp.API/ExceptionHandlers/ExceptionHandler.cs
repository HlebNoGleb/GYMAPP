using GymApp.API.Models;
using GymApp.Shared.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace GymApp.API.ExceptionHandlers;

public static class ExceptionHandler
{
    public static async Task Handle(HttpContext httpContext)
    {
        var errorFeature = httpContext.Features.Get<IExceptionHandlerFeature>();

        if (errorFeature != null)
        {
            var exception = errorFeature.Error; 

            var response = httpContext.Response;
            response.ContentType = "application/json";

            switch (exception)
            {
                case ValidationException validationException:
                {
                    var errors = validationException.Errors;
                    var validationApiResponse = new ErrorApiResponse(validationException.Message, errors);

                    await response.WriteAsJsonAsync(validationApiResponse);
                    break;
                }
                case EmailNotConfirmedException emailNotConfirmedException:
                {
                    var emailNotConfirmedApiResponse = new ErrorApiResponse(emailNotConfirmedException.Message);
                    await response.WriteAsJsonAsync(emailNotConfirmedApiResponse);
                    break;
                }
            }

            var responseModel = new ErrorApiResponse(exception.Message);
            await response.WriteAsJsonAsync(responseModel);
        }
    }
}