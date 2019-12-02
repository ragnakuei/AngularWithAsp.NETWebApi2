using BusinessLogic.DI;
using Microsoft.Extensions.DependencyInjection;

namespace AngularDemoWebForm.DI
{
    public class DiFactory
    {
        private static ServiceProvider _serviceProvider
        {
            get {
                var services = new ServiceCollection();
                services.AddBusinessLogicServices();
                ServiceProvider result = services.BuildServiceProvider();
                return result;
            }
        }

        public static T GetService<T>()
        {
            return _serviceProvider.GetService<T>();
        }
    }
}