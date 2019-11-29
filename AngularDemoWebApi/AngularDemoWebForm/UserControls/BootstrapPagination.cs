using SharedLibrary.Helper;
using System;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace AngularDemoWebForm.UserControls
{
    public class DynamicBootstrapPagination
    {
        private readonly HtmlGenericControl _control;
        private readonly string _id;
        private int _pageNo;
        private readonly int _pageSize;
        private readonly int _totalCount;
        private readonly string _position;
        private readonly int _pageCount;
        private readonly int _pageRangeNo = 3;
        private readonly int _startPageIndex;
        private readonly int _endPageIndex;

        #region Pagination Sign

        private const string _paginationSignFirst = "<<";
        private const string _paginationSignPrev = "<";
        private const string _paginationSignNext = ">";
        private const string _paginationSignLast = ">>";

        #endregion

        private const string _eventTargetName = "bootstrapPagination";


        public DynamicBootstrapPagination(HtmlGenericControl control,
                                          string id,
                                          int pageNo,
                                          int totalCount,
                                          int pageSize,
                                          string position)
        {
            _control = control;
            _id = id;
            _pageNo = pageNo;
            _totalCount = totalCount;
            _pageSize = pageSize;
            _position = position;

            _pageCount = _totalCount / _pageSize
                     + (_totalCount % _pageSize == 0
                            ? 0
                            : 1
                       );
            _startPageIndex = Math.Max(_pageNo - _pageRangeNo, 1);
            _endPageIndex = Math.Min(_pageNo + _pageRangeNo, _pageCount);

            AddControls();
        }

        private void OnClickLinkButton(object sender, EventArgs e)
        {
        }

        private void AddControls()
        {
            var nav = CreateNav();
            _control.Controls.Add(nav);

            var ul = CreateUl();
            nav.Controls.Add(ul);

            var li = Createli();
            li.Controls.Add(CreateLinkButton(_paginationSignFirst, 1));
            ul.Controls.Add(li);

            li = Createli();
            li.Controls.Add(CreateLinkButton(_paginationSignPrev, Math.Max(_pageNo - 1, 1)));
            ul.Controls.Add(li);

            for (var i = _startPageIndex; i <= _endPageIndex; i++)
            {
                li = Createli( i == _pageNo );
                li.Controls.Add(CreateLinkButton(i.ToString(), i));
                ul.Controls.Add(li);
            }

            li = Createli();
            li.Controls.Add(CreateLinkButton(_paginationSignNext, Math.Min(_pageNo + 1, _pageCount)));
            ul.Controls.Add(li);

            li = Createli();
            li.Controls.Add(CreateLinkButton(_paginationSignLast, _pageCount));
            ul.Controls.Add(li);
        }

        private HtmlGenericControl CreateNav()
        {
            var nav = new HtmlGenericControl("nav");
            nav.ID = _id;
            nav.Attributes["aria-label"] = "Page navigation";
            return nav;
        }

        private HtmlGenericControl CreateUl()
        {
            var ul = new HtmlGenericControl("ul");
            var position = _position.Equals("right", StringComparison.CurrentCultureIgnoreCase) ? "pull-right" : string.Empty;
            ul.Attributes["class"] = "pagination " + position;
            return ul;
        }

        private static HtmlGenericControl Createli(bool isActive = false)
        {
            var li = new HtmlGenericControl("li");
            var activeCss = isActive ? "active" : string.Empty;
            li.Attributes["class"] = $"page-item {activeCss}";
            return li;
        }

        private HtmlGenericControl CreateLinkButton(string text, int pageNo)
        {
            var a = new HtmlGenericControl("a");
            a.Attributes["class"] = "page-item ";
            a.Attributes["href"] = $"javascript: __doPostBack('{_eventTargetName}', '{pageNo}')";
            a.InnerText = text;
            return a;
        }
    }
}