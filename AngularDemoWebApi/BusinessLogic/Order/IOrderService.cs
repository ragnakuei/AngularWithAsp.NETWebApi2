using SharedLibrary.Dto;
using System.Data;

namespace BusinessLogic.Order
{
    public interface IOrderService
    {
        DataTable GetOrderList();
        OrderListDto GetOrderList(int index, int pageIndex);
        OrderDto GetOrder(int orderId);
        void UpdateOrder(int orderId, OrderDto orderDto);
        int CreateOrder(OrderDto orderDto);
        void DeleteOrder(int orderId);
    }
}