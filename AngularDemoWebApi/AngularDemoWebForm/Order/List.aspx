<%@ Page Title="Home Page"
    Language="C#"
    MasterPageFile="~/Site.Master"
    AutoEventWireup="true"
    CodeBehind="List.aspx.cs"
    Inherits="AngularDemoWebForm.Order.List" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <asp:GridView
        ID="orderList"
        runat="server"
        AutoGenerateColumns="false"
        CssClass="table"
        ShowHeader="true"
        EmptyDataText="No data available.">
        <Columns>
            <asp:BoundField DataField="OrderID" HeaderText="OrderID" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="CustomerID" HeaderText="CustomerID" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="EmployeeID" HeaderText="EmployeeID" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="OrderDate" HeaderText="OrderDate" InsertVisible="False" ReadOnly="True" DataFormatString="{0:yyyy/MM/dd}" />
            <asp:BoundField DataField="RequiredDate" HeaderText="RequiredDate" InsertVisible="False" ReadOnly="True" DataFormatString="{0:yyyy/MM/dd}" />
            <asp:BoundField DataField="ShippedDate" HeaderText="ShippedDate" InsertVisible="False" ReadOnly="True"  DataFormatString="{0:yyyy/MM/dd}" />
            <%--<asp:BoundField DataField="ShipVia" HeaderText="ShipVia" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="Freight" HeaderText="Freight" InsertVisible="False" ReadOnly="True" />--%>
            <%--<asp:BoundField DataField="ShipName" HeaderText="ShipName" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="ShipAddress" HeaderText="ShipAddress" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="ShipCity" HeaderText="ShipCity" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="ShipRegion" HeaderText="ShipRegion" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="ShipPostalCode" HeaderText="ShipPostalCode" InsertVisible="False" ReadOnly="True" />
            <asp:BoundField DataField="ShipCountry" HeaderText="ShipCountry" InsertVisible="False" ReadOnly="True" />--%>
            <asp:BoundField DataField="DetailCount" HeaderText="DetailCount" InsertVisible="False" ReadOnly="True" />
            <asp:TemplateField HeaderText="Management" InsertVisible="False">
                <EditItemTemplate>
                    <asp:Label ID="Label1" runat="server" Text=''></asp:Label>
                </EditItemTemplate>
                <ItemTemplate>
                    <asp:HyperLink
                        runat="server"
                        CssClass="btn btn-primary btn-sm"
                        NavigateUrl='<%# "Detail/" + Eval("OrderId") %>'
                        Text="Detail" />
                    <asp:HyperLink
                        runat="server"
                        CssClass="btn btn-primary btn-sm"
                        NavigateUrl='<%# "Edit/" + Eval("OrderId") %>'
                        Text="Edit" />
                    <asp:HyperLink
                        runat="server"
                        CssClass="btn btn-danger btn-sm"
                        NavigateUrl='<%# "Delete/" + Eval("OrderId") %>'
                        Text="Delete" />
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>

</asp:Content>
