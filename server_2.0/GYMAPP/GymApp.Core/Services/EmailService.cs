using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using GymApp.Core.Interfaces;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Users;
using Microsoft.Extensions.Configuration;

public class EmailService(IConfiguration configuration) : IEmailService
{
    public async Task SendEmailAsync(string to, object templateParams)
    {
        var emailData = new
        {
            service_id = configuration.GetSection("EmailSettings:EmailJS:ServiceId").Value,
            template_id = configuration.GetSection("EmailSettings:EmailJS:EmailConfirmationTemplateId").Value,
            user_id = configuration.GetSection("EmailSettings:EmailJS:UserId").Value,
            template_params = templateParams
        };

        await Send(emailData);
    }

    public async Task SendPasswordResetEmailAsync(ResetPasswordSendMail resetPasswordSendMail)
    {
        var emailData = new
        {
            service_id = configuration.GetSection("EmailSettings:EmailJS:ServiceId").Value,
            template_id = "template_elnz3mb",
            user_id = configuration.GetSection("EmailSettings:EmailJS:UserId").Value,
            template_params = resetPasswordSendMail
        };
        
        await Send(emailData);
    }

    private async Task Send(object emailData)
    {
        var httpClient = new HttpClient();
        var content = new StringContent(JsonSerializer.Serialize(emailData), Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync($"{configuration.GetSection("EmailSettings:EmailJS:ApiUrl").Value}", content);
        var result = await response.Content.ReadAsStringAsync();
        response.EnsureSuccessStatusCode();
    }
}