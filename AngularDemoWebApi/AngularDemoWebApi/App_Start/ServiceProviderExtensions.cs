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
    }
}