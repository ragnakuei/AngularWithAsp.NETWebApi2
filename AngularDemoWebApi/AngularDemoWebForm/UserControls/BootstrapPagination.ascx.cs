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
    public int pageIndex;
    public int pageSize;
    public int totalCount;
    protected int pageCount;

    protected void Page_Load(object sender, EventArgs e)
    {
        pageCount = totalCount/pageSize;
    }
}
}