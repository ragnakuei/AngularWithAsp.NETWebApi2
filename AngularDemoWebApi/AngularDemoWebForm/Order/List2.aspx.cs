using AngularDemoWebForm.DI;
using BusinessLogic.Order;
using System;
using System.Web.UI.WebControls;
using AngularDemoWebForm.UserControls;
using SharedLibrary.Helper;

namespace AngularDemoWebForm.Order
{
    public partial class List2 : System.Web.UI.Page
    {
        private const int DefaultPageSize = 10;

        /// <summary>
        /// UI 上是 Base 1，資料處理是 Base 0
        /// </summary>
        private int _pageIndex;
        private int _totalCount;
        private int _pageSize = DefaultPageSize;
        private IOrderService _orderService => DiFactory.GetService<IOrderService>();

        protected override void OnPreLoad(EventArgs e)
        {
            base.OnPreLoad(e);

            string eventTarget = this.Request["__EVENTTARGET"];
            if (eventTarget?.Equals("bootstrapPagination", StringComparison.CurrentCultureIgnoreCase) ?? false)
            {
                _pageIndex = Math.Max(this.Request["__EVENTARGUMENT"]?.ToInt32() - 1 ?? 0,
                                      0);
            }

            if ((orderList.ShowHeader && orderList.Rows.Count > 0)
             || (orderList.ShowHeaderWhenEmpty))
            {
                orderList.HeaderRow.TableSection = TableRowSection.TableHeader;
            }

            SetOrderListDataSource(_pageIndex, _pageSize);

            new DynamicBootstrapPagination(this.upperPagination,
                                "paginationUpper",
                                _pageIndex + 1,
                                _totalCount,
                                _pageSize,
                                "right"
                            );

            new DynamicBootstrapPagination(this.bottomPagination,
                                            "paginationBottom",
                                            _pageIndex + 1,
                                            _totalCount,
                                            _pageSize,
                                            "right"
                                        );
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