using AngularDemoWebForm.DI;
using BusinessLogic.Order;
using System;
using System.Web.UI.WebControls;
using AngularDemoWebForm.UserControls;
using SharedLibrary.Helper;

namespace AngularDemoWebForm.Order
{
    public partial class List : System.Web.UI.Page
    {
        private const int DefaultPageSize = 10;
        
        /// <summary>
        /// UI 上是 Base 1，資料處理是 Base 0
        /// </summary>
        private int _pageIndex;
        private int _totalCount;
        private int _pageSize;
        private IOrderService _orderService => DiFactory.GetService<IOrderService>();
        
        protected override void OnPreLoad(EventArgs e)
        {
            base.OnPreLoad(e);

            ExtractQueryString();
            
            if (!this.IsPostBack)
            {
                if ((orderList.ShowHeader && orderList.Rows.Count > 0)
                 || (orderList.ShowHeaderWhenEmpty))
                {
                    orderList.HeaderRow.TableSection = TableRowSection.TableHeader;
                }

                SetOrderListDataSource(_pageIndex, _pageSize);
            }
            
            var pagination = (BootstrapPagination)Page.LoadControl("~/UserControls/BootstrapPagination.ascx");
            pagination.PageIndex = _pageIndex + 1;
            pagination.TotalCount = _totalCount;
            pagination.PageSize = _pageSize;
            pagination.Positon = "right";
            upperPagination.Controls.Add(pagination);
            bottomPagination.Controls.Add(pagination.DeepClone());
        }

        private void ExtractQueryString()
        {
            var queryString = Request.QueryString;
            _pageSize = queryString["pageSize"]?.ToInt32() ?? DefaultPageSize;
            _pageIndex = queryString["pageIndex"]?.ToInt32() - 1  ?? 0;
        }

        private void SetOrderListDataSource(int pageIndex, int pageSize)
        {
            var orderListDto = _orderService?.GetOrderListToDataTable(pageIndex, pageSize);

            _totalCount = orderListDto.TotalCount;
            
            orderList.DataSource = orderListDto.Items;
            orderList.DataBind();
        }

        protected void orderListOnPageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            orderList.PageIndex = e.NewPageIndex;
            SetOrderListDataSource(0, 10);
        }
    }
}