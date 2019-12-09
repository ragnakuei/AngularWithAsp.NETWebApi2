namespace BusinessLogic.Configuration
{
    public interface IConfigurationService
    {
        string GetConnectionString(string name);
    }
}