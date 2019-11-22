using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using BusinessLogic.Configuration;
using Dapper;
using SharedLibrary.Dto;

namespace BusinessLogic.Options
{
    public class OptionsService : IOptionsService
    {
        private readonly IConfigurationService _configurationService;

        public OptionsService(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        public IEnumerable<CustomerOption> GetCustomers(string keyword)
        {
            using (var connection = new SqlConnection(_configurationService.GetConnectionString("Northwind")))
            {
                var sql = @"
SELECT c.CustomerID, c.CompanyName
FROM dbo.Customers c
WHERE c.CustomerID LIKE @keyword
   OR c.CompanyName LIKE @keyword
";
                var dynamicParemeter = new DynamicParameters();
                dynamicParemeter.Add("keyword", $"%{keyword}%", DbType.String, size : 50);
                return connection.Query<CustomerOption>(sql, dynamicParemeter);
            }
        }
    }
}