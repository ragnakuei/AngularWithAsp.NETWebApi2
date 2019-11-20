
export class OrderList {
    TotalCount : number;
    Items : OrderListItem[];
}

export class OrderListItem {
    OrderID: number;
    CustomerID: string;
    EmployeeID: number;
    OrderDate: string;
    RequiredDate: string;
    ShippedDate: string;
    ShipVia: number;
    Freight: number;
    ShipName: string;
    ShipAddress: string;
    ShipCity: string;
    ShipRegion: null;
    ShipPostalCode: string;
    ShipCountry: string;
    DetailCount: number;
}

