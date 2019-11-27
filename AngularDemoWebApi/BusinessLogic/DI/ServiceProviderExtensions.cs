using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DI
{
    public static class ServiceProviderExtensions
    {
        public static void AddBusinessLogicServices(this IServiceCollection services)
        {
            var serviceTypes = Assembly.Load("BusinessLogic")
                                       .GetTypes()
                                       .Where(i => i.Name.EndsWith("Service", StringComparison.OrdinalIgnoreCase))
                                       .ToArray();

            foreach (var interfaceType in serviceTypes.Where(t => t.IsInterface))
            {
                var implementClassType = serviceTypes.FirstOrDefault(t => t.IsInterface == false
                                                                       && interfaceType.IsAssignableFrom(t)
                                                                       && !t.IsInterface && !t.IsAbstract);
                if (interfaceType != null
                 && implementClassType != null)
                {
                    typeof(ServiceCollectionServiceExtensions)
                       .GetMethods()
                       .FirstOrDefault(m => m.Name.Equals("AddTransient", StringComparison.CurrentCultureIgnoreCase)
                                         && m.IsGenericMethod
                                         && m.GetParameters().Length == 1)
                      ?.MakeGenericMethod(interfaceType, implementClassType)
                       .Invoke(null, new object[] { services });
                }
            }
        }
    }
}
