using System.Collections.Generic;
using SharedLibrary.Dto;

namespace BusinessLogic.Options
{
    public interface IOptionsService
    {
        IEnumerable<CustomerOption> GetCustomers(string keyword);
    }
}