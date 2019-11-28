using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AngularDemoWebForm.UserControls
{
    public partial class BootstrapPagination : System.Web.UI.UserControl
    {
        public int PageIndex;
        public int PageSize;
        public int TotalCount;
        public string Positon;

        protected int pageCount;
        protected int pageRangeIndex = 3;
        protected int startPageIndex;
        protected int endPageIndex;

        protected void Page_Load(object sender, EventArgs e)
        {
            pageCount = TotalCount / PageSize
                      + (TotalCount % PageSize == 0
                             ? 0
                             : 1
                        );
            startPageIndex = Math.Max(PageIndex - pageRangeIndex, 1);
            endPageIndex = Math.Min(PageIndex + pageRangeIndex, pageCount);
        }

        protected string BuildQueryString(int targetPageIndex)
        {
            var absoluteUri = Request.Url.AbsoluteUri;
            var uriBuilder = new UriBuilder(absoluteUri);
            var queryStrings = HttpUtility.ParseQueryString(uriBuilder.Query);
            queryStrings[nameof(PageIndex)] = targetPageIndex.ToString();
            queryStrings[nameof(PageSize)] = PageSize.ToString();
            uriBuilder.Query = queryStrings.ToString();
            return uriBuilder.ToString();
        }

        public BootstrapPagination DeepClone()
        {
            return this.MemberwiseClone() as BootstrapPagination;
        }
    }
}