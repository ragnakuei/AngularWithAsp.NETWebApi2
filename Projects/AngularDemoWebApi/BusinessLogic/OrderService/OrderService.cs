using System;
using System.Collections.Generic;
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
        private readonly string _connectionString;

        public OrderService(IConfigurationService configurationService)
        {
            _connectionString = configurationService.GetConnectionString("Northwind");
        }

        public OrderListDto[] GetOrderList()
        {
            var result = Enumerable.Empty<OrderListDto>();
            
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"
SELECT OrderID,
       CustomerID,
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
       ShipCountry,
       od.DetailCount
FROM dbo.Orders o
    OUTER APPLY (
                    SELECT count(0) AS DetailCount
                    FROM dbo.[Order Details] od
                    WHERE od.OrderID = o.OrderID
                ) od
";
                var gridReader = connection.QueryMultiple(sql);

                result = gridReader.Read<OrderListDto>();
            }

            return result.ToArray();
        }

        public OrderDto GetOrder(int orderId)
        {
            Order order = null;
            var orderDetails = Enumerable.Empty<OrderDetail>();

            using (var connection = new SqlConnection(_connectionString))
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
                             Details = orderDetails.Select(od => new OrderDetailDto
                                                                {
                                                                    ProductID = od.ProductID,
                                                                    UnitPrice = od.UnitPrice,
                                                                    Quantity = od.Quantity,
                                                                    Discount = od.Discount,
                                                                }).ToArray(),
                         };
            return result;
        }

        public int CreateOrder(OrderDto orderDto)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"
declare @maxOrderId int
select @maxOrderId = max(od.OrderID) + 1
from dbo.Orders od

SET IDENTITY_INSERT Orders ON;

INSERT into dbo.Orders(OrderID,
                       CustomerID,
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
values (@maxOrderId,
        @CustomerID,
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

insert into dbo.[Order Details](OrderID, ProductID, UnitPrice, Quantity, Discount)
select @maxOrderId, ProductID, UnitPrice, Quantity, Discount
from @OrderDetails

SET IDENTITY_INSERT Orders OFF;

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
                dynamicParemeter.Add("OrderDetails", GenerateOrderDetailsDataTable(orderDto.Details).AsTableValuedParameter("dbo.ut_OrderDetail"));

                return connection.Query<int>(sql, dynamicParemeter).FirstOrDefault();
            }
        }

        public void UpdateOrder(int orderId, OrderDto orderDto)
        {
            using (var connection = new SqlConnection(_connectionString))
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

delete from dbo.[Order Details]
where OrderID = @OrderID 

insert into dbo.[Order Details](OrderID, ProductID, UnitPrice, Quantity, Discount)
select @OrderId, ProductID, UnitPrice, Quantity, Discount
from @OrderDetails
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
                dynamicParemeter.Add("OrderDetails", GenerateOrderDetailsDataTable(orderDto.Details).AsTableValuedParameter("dbo.ut_OrderDetail"));

                connection.Execute(sql, dynamicParemeter);
            }
        }

        private static DataTable GenerateOrderDetailsDataTable(IEnumerable<OrderDetailDto> orderDtoDetails)
        {
            var result = new DataTable();
            
            var column = new DataColumn();
            column.ColumnName = "ProductID";
            column.AllowDBNull = false;
            column.DataType = typeof(int);
            result.Columns.Add(column);
            
            column = new DataColumn();
            column.ColumnName = "UnitPrice";
            column.AllowDBNull = false;
            column.DataType = typeof(decimal);
            result.Columns.Add(column);
            
            column = new DataColumn();
            column.ColumnName = "Quantity";
            column.AllowDBNull = false;
            column.DataType = typeof(short);
            result.Columns.Add(column);
            
            column = new DataColumn();
            column.ColumnName = "Discount";
            column.AllowDBNull = false;
            column.DataType = typeof(float);
            result.Columns.Add(column);

            foreach (var detail in orderDtoDetails)
            {
                var row = result.NewRow();
                row[0] = detail.ProductID;
                row[1] = detail.UnitPrice;
                row[2] = detail.Quantity;
                row[3] = detail.Discount;
                result.Rows.Add(row);
            }

            return result;
        }

        public void DeleteOrder(int orderId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"
DELETE dbo.[Order Details]
WHERE OrderId = @orderId

DELETE dbo.Orders
WHERE OrderId = @orderId
";
                var dynamicParemeter = new DynamicParameters();
                dynamicParemeter.Add("OrderId", orderId, DbType.Int32);

                connection.Execute(sql, dynamicParemeter);
            }
        }
    }
}