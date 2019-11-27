using AngularDemoWebForm.DI;
using BusinessLogic.Order;
using System;
using System.Web.UI.WebControls;

namespace AngularDemoWebForm.Order
{
    public partial class List : System.Web.UI.Page
    {
        public IOrderService _orderService => DiFactory.GetService<IOrderService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                if ((orderList.ShowHeader && orderList.Rows.Count > 0)
                 || (orderList.ShowHeaderWhenEmpty))
                {
                    orderList.HeaderRow.TableSection = TableRowSection.TableHeader;
                }

                SetOrderListDataSource(0, orderList.PageSize);
            }
        }


        private void SetOrderListDataSource(int pageIndex, int pageSize)
        {
            orderList.DataSource = _orderService?.GetOrderListToDataTable(pageIndex, pageSize);
            orderList.DataBind();
        }

        protected void orderListOnPageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            orderList.PageIndex = e.NewPageIndex;
            SetOrderListDataSource(0, 10);
        }
    }
}