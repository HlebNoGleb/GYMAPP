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
    public async Task SendEmailAsync(dynamic templateParams, dynamic settings)
    {
        var emailData = new
        {
            service_id = settings.service_id,
            template_id = settings.template_id,
            user_id = settings.user_id,
            template_params = templateParams
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