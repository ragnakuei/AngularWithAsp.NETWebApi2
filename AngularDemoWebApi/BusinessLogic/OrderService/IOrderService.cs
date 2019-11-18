using SharedLibrary.Dto;
using SharedLibrary.Entity;

namespace BusinessLogic.OrderService
{
    public interface IOrderService
    {
        OrderListDto[] GetOrderList();
        OrderDto GetOrder(int orderId);
        void UpdateOrder(int orderId, OrderDto orderDto);
        int CreateOrder(OrderDto orderDto);
        void DeleteOrder(int orderId);
    }
}