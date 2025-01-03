namespace GymApp.Shared.Localization;
using System.Resources;

public static class ResourceHelper
{
    public static readonly ResourceManager ErrorResourceManager = CreateErrorResourceManager();
    public static readonly ResourceManager BusinessResourceManager = CreateBusinessResourceManager();

    private static ResourceManager CreateErrorResourceManager()
    {
        return new ResourceManager("GymApp.Shared.Localization.Errors.Errors", typeof(ResourceHelper).Assembly);
    }
    
    private static ResourceManager CreateBusinessResourceManager()
    {
        return new ResourceManager("GymApp.Shared.Localization.Business.Business", typeof(ResourceHelper).Assembly);
    }

    public static string GetResource(ResourceManager manager, string name)
    {
        return manager.GetString(name) ?? "";
    }
}