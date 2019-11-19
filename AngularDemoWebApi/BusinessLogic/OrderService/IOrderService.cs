using System.Threading.Tasks;
using SharedLibrary.Dto;

namespace BusinessLogic.OrderService
{
    public interface IOrderService
    {
        OrderListDto[] GetOrderList();
        Task<OrderListDto[]> GetOrderListAsync();
        OrderDto GetOrder(int orderId);
        void UpdateOrder(int orderId, OrderDto orderDto);
        int CreateOrder(OrderDto orderDto);
        void DeleteOrder(int orderId);
    }
}