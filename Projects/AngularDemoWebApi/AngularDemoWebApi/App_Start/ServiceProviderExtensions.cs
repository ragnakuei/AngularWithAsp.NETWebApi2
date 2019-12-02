using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using Microsoft.Extensions.DependencyInjection;

namespace AngularDemoWebApi
{
    public static class ServiceProviderExtensions
    {
        public static void AddControllersAsServices(this IServiceCollection services)
        {
            var controllerTypes = Assembly.GetExecutingAssembly()
                                          .GetTypes()
                                          .Where(t => !t.IsAbstract && !t.IsGenericTypeDefinition)
                                          .Where(t => typeof(ApiController).IsAssignableFrom(t)
                                                   || t.Name.EndsWith("Controller", StringComparison.CurrentCultureIgnoreCase));

            foreach (var type in controllerTypes)
            {
                services.AddTransient(type);
            }
        }

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