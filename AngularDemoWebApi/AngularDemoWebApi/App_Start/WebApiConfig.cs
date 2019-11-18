using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Dispatcher;
using AngularDemoWebApi.Controllers;
using Microsoft.Extensions.DependencyInjection;

namespace AngularDemoWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 設定和服務
            
            var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            config.EnableCors(cors);
            
            // Web API 路由
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                                       name : "DefaultApi",
                                       routeTemplate : "api/{controller}/{id}",
                                       defaults : new { id = RouteParameter.Optional }
                                      );
            
            var services = new ServiceCollection();
            services.AddControllersAsServices();
            services.AddBusinessLogicServices();

            var provider = services.BuildServiceProvider(); 
            config.DependencyResolver = new MyDependencyResolver(provider);  
        }
    }
}