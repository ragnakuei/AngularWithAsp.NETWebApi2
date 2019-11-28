using System;
using System.Data;

namespace SharedLibrary.Dto
{
    public class OrderListDto
    {
        public int TotalCount { get; set; }
        public OrderListItemDto[] Items { get; set; }
    }
    
    public class OrderListDataTable
    {
        public int TotalCount { get; set; }
        public DataTable Items { get; set; }
    }
    
    public class OrderListItemDto
    {
        public int OrderID { get; set; }

        public string CustomerID { get; set; }

        public int? EmployeeID { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? RequiredDate { get; set; }

        public DateTime? ShippedDate { get; set; }

        public int? ShipVia { get; set; }

        public decimal? Freight { get; set; }

        public string ShipName { get; set; }

        public string ShipAddress { get; set; }

        public string ShipCity { get; set; }

        public string ShipRegion { get; set; }

        public string ShipPostalCode { get; set; }

        public string ShipCountry { get; set; }
        
        public int DetailCount { get; set; }
    }
}