using AngularDemoWebForm.DI;
using BusinessLogic.Order;
using System;
using System.Web.UI.WebControls;

namespace AngularDemoWebForm.Order
{
    public partial class List : System.Web.UI.Page
    {
        public IOrderService _orderService
            => DiFactory.GetService<IOrderService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            var orderListFromDb = _orderService?.GetOrderList();

            orderList.DataSource = orderListFromDb;
            orderList.DataBind();

            if ((orderList.ShowHeader == true && orderList.Rows.Count > 0)
             || (orderList.ShowHeaderWhenEmpty == true))
            {
                orderList.HeaderRow.TableSection = TableRowSection.TableHeader;
            }

            orderList.GridLines = GridLines.None;
        }

        protected void btnDetailClick(object sender, EventArgs e)
        {
            var target = sender;
        }
    }
}