import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderList } from "src/app/models/OrderList";
import { OrderService } from "../order.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  templateUrl: "./order.list.component.html",
  styles: [`
  table {
	width: 100%;
  }
  `]
})
export class OrderListComponent implements OnInit {
  orderListDataSource = new MatTableDataSource<OrderList>();
  displayedColumns: string[] = [
    "OrderID",
    "CustomerID",
    "EmployeeID",
    "OrderDate",
    "RequiredDate",
    "ShippedDate",
    "ShipVia",
    "Freight",
    "ShipName",
    "ShipAddress",
    "ShipCity",
    "ShipRegion",
    "ShipPostalCode",
    "ShipCountry",
    "DetailCount"
  ];

  list: OrderList[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderService.getList().subscribe(
      resp => {
        // for (var orderList of resp) {
        // 	this.list.push(orderList);
        // }
        this.orderListDataSource.data = resp;
      },
      err => console.log("Error", err)
    );
  }

  onSelect(orderId: number) {
    console.log(orderId);
    this.router.navigate(["/order/detail/" + orderId]);
    // this.router.navigate(['../order/detail/', orderId], { relativeTo: this.route });
  }
}
