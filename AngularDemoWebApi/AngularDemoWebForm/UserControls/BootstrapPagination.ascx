<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="BootstrapPagination.ascx.cs" Inherits="AngularDemoWebForm.UserControls.BootstrapPagination" %>

<nav aria-label="Page navigation">
    <ul class="pagination <%: Positon.Equals("right", StringComparison.CurrentCultureIgnoreCase) ? "pull-right" : string.Empty %> ">
        <% if (PageIndex > 1)
           { %>
            <li class="page-item">
                <a class="page-link" href="<%: BuildQueryString(1) %>">
                    <<
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="<%: BuildQueryString(PageIndex - 1) %>">
                    <
                </a>
            </li>
        <% } %>

        <% for (var i = startPageIndex ; i <= endPageIndex ; i++)
           { %>
            <li class="page-item <%: (i == PageIndex ? "active" : string.Empty) %>">
                <a class="page-link"
                   href="<%: BuildQueryString(i) %>">
                    <%: i %>
                </a>
            </li>
        <% } %>

        <% if (PageIndex < pageCount)
           { %>
            <li class="page-item">
                <a class="page-link" href="<%: BuildQueryString(PageIndex + 1) %>">
                    >
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="<%: BuildQueryString(pageCount) %>">
                    >>
                </a>
            </li>
        <% } %>
    </ul>
</nav>