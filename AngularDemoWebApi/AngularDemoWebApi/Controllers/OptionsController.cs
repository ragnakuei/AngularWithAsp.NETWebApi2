using System.Web.Http;
using BusinessLogic.Options;

namespace AngularDemoWebApi.Controllers
{
    [RoutePrefix("api/options")]
    public class OptionsController : ApiController
    {
        private readonly IOptionsService _optionsService;

        public OptionsController(IOptionsService optionsService)
        {
            _optionsService = optionsService;
        }
        
        [HttpGet, Route("customers")]
        public IHttpActionResult Customers(string keyword)
        {
            var result = _optionsService.GetCustomers(keyword);
            return Ok(result);
        }
    }
}