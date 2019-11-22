import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { OrderList, OrderListItem } from "src/app/models/OrderList";
import { OrderService } from "../order.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { OrderConfirmDeleteDialogComponent } from "../order-confirm-delete-dialog/order-confirm-delete-dialog.component";

@Component({
  templateUrl: "./order.list.component.html",
  styles: [
    `
      table {
        width: 100%;
      }
    `
  ]
})
export class OrderListComponent implements OnInit {
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
    "Management"
  ];

  orderListDataSource = new MatTableDataSource<OrderListItem>();

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  totalCount: number;

  list: OrderList[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrderList(1, 10);

    this.paginator.page.subscribe((page: PageEvent) => {
      this.getOrderList(page.pageIndex, page.pageSize);
    });
  }

  private getOrderList(pageIndex: number, pageSize: number) {
    this.orderService.getList(pageIndex, pageSize).subscribe(
      resp => {
        this.orderListDataSource.data = resp.Items;
        this.totalCount = resp.TotalCount;
      },
      err => console.log("Error", err)
    );
  }

  goToDetailPage(orderId:number, isReadonly : boolean){
    const navigationExtras: NavigationExtras = {state: {isReadonly: isReadonly}};
    this.router.navigate(['/order/detail', orderId], navigationExtras);
  }

  onSelect(orderId: number) {
    console.log(orderId);
  }

  openDeleteDialog(orderId: number): void {
    const dialogRef = this.dialog.open(OrderConfirmDeleteDialogComponent, {
      width: "250px",
      data: orderId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");

      if (result === true) {
        this.getOrderList(this.paginator.pageIndex, this.paginator.pageSize); 
      }
    });
  }
}
