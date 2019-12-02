import { OrderDetail } from './OrderDetail';
export class Order {
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
    Details: OrderDetail[];
}
