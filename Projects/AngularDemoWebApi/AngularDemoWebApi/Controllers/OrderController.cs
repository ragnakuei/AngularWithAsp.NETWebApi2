using System.Threading.Tasks;
using System.Web.Http;
using BusinessLogic.OrderService;
using SharedLibrary.Dto;

namespace AngularDemoWebApi.Controllers
{
    [RoutePrefix("api/order")]
    public class OrderController : ApiController
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet, Route("list")]
        public IHttpActionResult List()
        {
            var result = _orderService.GetOrderList();
            return Ok(result);
        }

        [HttpGet, Route("detail/{orderId:int}")]
        public IHttpActionResult Order(int orderId)
        {
            var result = _orderService.GetOrder(orderId);
            return Ok(result);
        }

        [HttpPost, Route("create")]
        public IHttpActionResult CreateOrder(OrderDto orderDto)
        {
            var newOrderId = _orderService.CreateOrder(orderDto);
            return Ok(newOrderId);
        }

        [HttpPut, Route("{orderId:int}")]
        public IHttpActionResult UpdateOrder(int orderId, OrderDto orderDto)
        {
            _orderService.UpdateOrder(orderId, orderDto);
            return Ok(orderId);
        }

        [HttpDelete, Route("{orderId:int}")]
        public IHttpActionResult DeleteOrder(int orderId)
        {
            _orderService.DeleteOrder(orderId);
            return Ok();
        }
    }
}