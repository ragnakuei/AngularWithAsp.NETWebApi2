using SharedLibrary.Dto;
using System.Data;

namespace BusinessLogic.Order
{
    public interface IOrderService
    {
        DataTable GetOrderListToDataTable(int pageIndex, int pageSize);
        OrderListDto GetOrderList(int pageIndex, int pageSize);
        OrderDto GetOrder(int orderId);
        void UpdateOrder(int orderId, OrderDto orderDto);
        int CreateOrder(OrderDto orderDto);
        void DeleteOrder(int orderId);
    }
}