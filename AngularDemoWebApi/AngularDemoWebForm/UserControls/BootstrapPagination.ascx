<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="BootstrapPagination.ascx.cs" Inherits="AngularDemoWebForm.UserControls.BootstrapPagination" %>

<nav aria-label="Page navigation">
    <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">First</a></li>
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>

        <% foreach (var i in Enumerable.Range(1, pageCount))
            { %>
        <li class="page-item"><a class="page-link" href="#"><%: i %></a></li>
        <% } %>

        <li class="page-item"><a class="page-link" href="#">Next</a></li>
        <li class="page-item"><a class="page-link" href="#">Last</a></li>
    </ul>
</nav>
