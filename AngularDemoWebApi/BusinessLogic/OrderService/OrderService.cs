using System.Data;
using System.Data.SqlClient;
using System.Linq;
using BusinessLogic.Configuration;
using Dapper;
using SharedLibrary.Dto;
using SharedLibrary.Entity;
using SharedLibrary.Helper;

namespace BusinessLogic.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IConfigurationService _configurationService;

        public OrderService(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        public OrderListDto[] GetOrderList()
        {
            var orders = Enumerable.Empty<Order>();
            var orderDetails = Enumerable.Empty<int>();

            using (var connection = new SqlConnection(_configurationService.GetConnectionString("Northwind")))
            {
                var sql = @"
select *
from dbo.Orders

select od.OrderID
from dbo.[Order Details] od
";
                var gridReader = connection.QueryMultiple(sql);

                orders = gridReader.Read<Order>();
                orderDetails = gridReader.Read<int>();
            }

            var orderDetailCount = orderDetails.GroupBy(od => od)
                                               .ToDictionary(od => od.Key, od => od.Count());

            var result = orders.Select(o =>
                                       {
                                           return new OrderListDto
                                                  {
                                                      OrderID = o.OrderID,
                                                      CustomerID = o.CustomerID,
                                                      EmployeeID = o.EmployeeID,
                                                      OrderDate = o.OrderDate,
                                                      RequiredDate = o.RequiredDate,
                                                      ShippedDate = o.ShippedDate,
                                                      ShipVia = o.ShipVia,
                                                      Freight = o.Freight,
                                                      ShipName = o.ShipName,
                                                      ShipAddress = o.ShipAddress,
                                                      ShipCity = o.ShipCity,
                                                      ShipRegion = o.ShipRegion,
                                                      ShipPostalCode = o.ShipPostalCode,
                                                      ShipCountry = o.ShipCountry,
                                                      DetailCount = orderDetailCount.GetValue(o.OrderID)
                                                  };
                                       }).ToArray();
            return result;
        }

        public OrderDto GetOrder(int orderId)
        {
            Order order = null;
            var orderDetails = Enumerable.Empty<OrderDetail>();

            using (var connection = new SqlConnection(_configurationService.GetConnectionString("Northwind")))
            {
                var sql = @"
select o.*
from dbo.Orders o
where o.OrderID = @orderId

select od.*
from dbo.[Order Details] od
where od.OrderID = @orderId
";
                var dynamicParemeter = new DynamicParameters();
                dynamicParemeter.Add("orderId", orderId, DbType.Int32);
                var gridReader = connection.QueryMultiple(sql, dynamicParemeter);

                order = gridReader.Read<Order>().FirstOrDefault();
                orderDetails = gridReader.Read<OrderDetail>();
            }

            var result = new OrderDto
                         {
                             OrderID = order.OrderID,
                             CustomerID = order.CustomerID,
                             EmployeeID = order.EmployeeID,
                             OrderDate = order.OrderDate,
                             RequiredDate = order.RequiredDate,
                             ShippedDate = order.ShippedDate,
                             ShipVia = order.ShipVia,
                             Freight = order.Freight,
                             ShipName = order.ShipName,
                             ShipAddress = order.ShipAddress,
                             ShipCity = order.ShipCity,
                             ShipRegion = order.ShipRegion,
                             ShipPostalCode = order.ShipPostalCode,
                             ShipCountry = order.ShipCountry,
                             Detail = orderDetails.Select(od => new OrderDetailDto
                                                                {
                                                                    ProductID = od.ProductID,
                                                                    UnitPrice = od.UnitPrice,
                                                                    Quantity = od.Quantity,
                                                                    Discount = od.Discount,
                                                                }).ToArray(),
                         };
            return result;
        }

        public void UpdateOrder(int orderId, OrderDto orderDto)
        {
            using (var connection = new SqlConnection(_configurationService.GetConnectionString("Northwind")))
            {
                var sql = @"
update dbo.orders
set CustomerID = @CustomerID,
    EmployeeID = @EmployeeID,
    OrderDate = @OrderDate,
    RequiredDate = @RequiredDate,
    ShippedDate = @ShippedDate,
    ShipVia = @ShipVia,
    Freight = @Freight,
    ShipName = @ShipName,
    ShipAddress = @ShipAddress,
    ShipCity = @ShipCity,
    ShipRegion = @ShipRegion,
    ShipPostalCode = @ShipPostalCode,
    ShipCountry = @ShipCountry
where OrderID = @OrderID
";
                var dynamicParemeter = new DynamicParameters();
                dynamicParemeter.Add("OrderId", orderDto.OrderID, DbType.Int32);
                dynamicParemeter.Add("CustomerID", orderDto.CustomerID, DbType.StringFixedLength, size : 5);
                dynamicParemeter.Add("EmployeeID", orderDto.EmployeeID, DbType.Int32);
                dynamicParemeter.Add("OrderDate", orderDto.OrderDate, DbType.Date);
                dynamicParemeter.Add("RequiredDate", orderDto.RequiredDate, DbType.Date);
                dynamicParemeter.Add("ShippedDate", orderDto.ShippedDate, DbType.Date);
                dynamicParemeter.Add("ShipVia", orderDto.ShipVia, DbType.Int32);
                dynamicParemeter.Add("Freight", orderDto.Freight, DbType.Decimal);
                dynamicParemeter.Add("ShipName", orderDto.ShipName, DbType.String, size : 40);
                dynamicParemeter.Add("ShipAddress", orderDto.ShipAddress, DbType.String, size : 60);
                dynamicParemeter.Add("ShipCity", orderDto.ShipCity, DbType.String, size : 15);
                dynamicParemeter.Add("ShipRegion", orderDto.ShipRegion, DbType.String, size : 15);
                dynamicParemeter.Add("ShipPostalCode", orderDto.ShipPostalCode, DbType.String, size : 10);
                dynamicParemeter.Add("ShipCountry", orderDto.ShipCountry, DbType.String, size : 15);

                connection.Execute(sql, dynamicParemeter);
            }
        }

        public int CreateOrder(OrderDto orderDto)
        {
            using (var connection = new SqlConnection(_configurationService.GetConnectionString("Northwind")))
            {
                var sql = @"
declare @maxOrderId int
select @maxOrderId = max(od.OrderID) + 1
from dbo.Orders od

INSERT into dbo.Orders(CustomerID,
                       EmployeeID,
                       OrderDate,
                       RequiredDate,
                       ShippedDate,
                       ShipVia,
                       Freight,
                       ShipName,
                       ShipAddress,
                       ShipCity,
                       ShipRegion,
                       ShipPostalCode,
                       ShipCountry)
values (@CustomerID,
        @EmployeeID,
        @OrderDate,
        @RequiredDate,
        @ShippedDate,
        @ShipVia,
        @Freight,
        @ShipName,
        @ShipAddress,
        @ShipCity,
        @ShipRegion,
        @ShipPostalCode,
        @ShipCountry)

select @maxOrderId
";
                var dynamicParemeter = new DynamicParameters();
                dynamicParemeter.Add("CustomerID", orderDto.CustomerID, DbType.StringFixedLength, size : 5);
                dynamicParemeter.Add("EmployeeID", orderDto.EmployeeID, DbType.Int32);
                dynamicParemeter.Add("OrderDate", orderDto.OrderDate, DbType.Date);
                dynamicParemeter.Add("RequiredDate", orderDto.RequiredDate, DbType.Date);
                dynamicParemeter.Add("ShippedDate", orderDto.ShippedDate, DbType.Date);
                dynamicParemeter.Add("ShipVia", orderDto.ShipVia, DbType.Int32);
                dynamicParemeter.Add("Freight", orderDto.Freight, DbType.Decimal);
                dynamicParemeter.Add("ShipName", orderDto.ShipName, DbType.String, size : 40);
                dynamicParemeter.Add("ShipAddress", orderDto.ShipAddress, DbType.String, size : 60);
                dynamicParemeter.Add("ShipCity", orderDto.ShipCity, DbType.String, size : 15);
                dynamicParemeter.Add("ShipRegion", orderDto.ShipRegion, DbType.String, size : 15);
                dynamicParemeter.Add("ShipPostalCode", orderDto.ShipPostalCode, DbType.String, size : 10);
                dynamicParemeter.Add("ShipCountry", orderDto.ShipCountry, DbType.String, size : 15);

                return connection.Query<int>(sql, dynamicParemeter).FirstOrDefault();
            }
        }

        public void DeleteOrder(int orderId)
        {
            using (var connection = new SqlConnection(_configurationService.GetConnectionString("Northwind")))
            {
                var sql = @"
delete dbo.Orders
where OrderId = @orderId
";
                var dynamicParemeter = new DynamicParameters();
                dynamicParemeter.Add("OrderId", orderId, DbType.Int32);

                connection.Execute(sql, dynamicParemeter);
            }
        }
    }
}