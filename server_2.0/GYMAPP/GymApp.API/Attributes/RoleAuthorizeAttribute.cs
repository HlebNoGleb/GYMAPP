using GymApp.Shared.Enums;
using Microsoft.AspNetCore.Authorization;

namespace GymApp.API.Attributes;

public class RoleAuthorizeAttribute : AuthorizeAttribute
{
    public RoleAuthorizeAttribute(params UserRoles[] roles)
    {
        Roles = string.Join(",", roles);
    }
}
