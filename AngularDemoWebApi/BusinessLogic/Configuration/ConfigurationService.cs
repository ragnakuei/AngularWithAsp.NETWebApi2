using System.Configuration;

namespace BusinessLogic.Configuration
{
    public class ConfigurationService : IConfigurationService
    {
        public string GetConnectionString(string name)
        {
            return ConfigurationManager.ConnectionStrings[name]?.ConnectionString;
        }
    }
}