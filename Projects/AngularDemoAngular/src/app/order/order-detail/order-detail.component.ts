import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { OrderService } from "../order.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Order } from "src/app/models/Order";
import { MatDialog } from "@angular/material/dialog";
import { OrderConfirmDeleteDialogComponent } from "../order-confirm-delete-dialog/order-confirm-delete-dialog.component";
import { MatDatepicker } from "@angular/material/datepicker";
import { OrderDetail } from 'src/app/models/OrderDetail';

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"]
})
export class OrderDetailComponent implements OnInit {
  orderId: number;
  order: Order;
  orderForm: FormGroup;
  isReadOnly: boolean = true;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    if (this.router.getCurrentNavigation().extras.state != undefined) {
      this.isReadOnly = this.router.getCurrentNavigation().extras.state.isReadonly;
    }
    console.log("isReadOnly:" + this.isReadOnly);
  }

  ngOnInit() {
    console.log(this.isReadOnly);

    this.route.params.subscribe((params: Params) => {
      this.orderId = params["id"];
      this.orderService.getOrder(this.orderId).subscribe(
        responseOrder => {
          this.order = responseOrder;
          this.orderForm = this.formBuilder.group({
            OrderID: [responseOrder.OrderID],
            CustomerID: [responseOrder.CustomerID, Validators.required],
            EmployeeID: [responseOrder.EmployeeID],
            OrderDate: [responseOrder.OrderDate],
            RequiredDate: [responseOrder.RequiredDate],
            ShippedDate: [responseOrder.ShippedDate],
            ShipVia: [responseOrder.ShipVia],
            Freight: [responseOrder.Freight],
            ShipName: [responseOrder.ShipName],
            ShipAddress: [responseOrder.ShipAddress],
            ShipCity: [responseOrder.ShipCity],
            ShipRegion: [responseOrder.ShipRegion],
            ShipPostalCode: [responseOrder.ShipPostalCode],
            ShipCountry: [responseOrder.ShipCountry],
            Details: this.formBuilder.array(
              responseOrder.Details.map(detail =>
                this.formBuilder.group({
                  ProductID: [detail.ProductID],
                  UnitPrice: [detail.UnitPrice],
                  Quantity: [detail.Quantity],
                  Discount: [detail.Discount]
                })
              )
            )
          });
        },
        err => console.log("Error", err)
      );
    });
  }

  addDetails() {
    (this.orderForm.get("Details") as FormArray).push(
      this.formBuilder.group({
        ProductID: [""],
        UnitPrice: [""],
        Quantity: [""],
        Discount: [""]
      })
    );
  }

  removeDetail(detailIndex: number) {
    (this.orderForm.get("Details") as FormArray).removeAt(detailIndex);
  }

  changeToReadOnlyMode() {
    this.orderForm.reset(this.order);

    const detailFormArray = (this.orderForm.get("Details") as FormArray);
    detailFormArray.clear();
    
    for(var detail of this.order.Details)
    {
        detailFormArray.push(this.formBuilder.group({
            ProductID: [detail.ProductID],
            UnitPrice: [detail.UnitPrice],
            Quantity: [detail.Quantity],
            Discount: [detail.Discount]
          }));
    }
 
    this.isReadOnly = true;
  }

  changeToEditMode() {
    this.isReadOnly = false;
  }

  checkHidden() {
    let hiddenStyle = {
      visibility: this.isReadOnly ? "hidden" : ""
    };
    return hiddenStyle;
  }

  openDatePicker(datePicker: MatDatepicker<any>) {
    if (this.isReadOnly) {
      return;
    }

    datePicker.open();
  }

  deleteOrder() {
    const dialogRef = this.dialog.open(OrderConfirmDeleteDialogComponent, {
      width: "250px",
      data: this.orderId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");

      if (result === true) {
        this.router.navigate(["/order"]);
      }
    });
  }

  onSubmit(submitData: Order) {
    this.orderService.updateOrder(submitData).subscribe(
      val => {
        this.isReadOnly = true;
        this.ngOnInit();
      },
      response => {
        console.log("PUT call in error", response);
      }
    );
  }

  backToPreviousPage() {
    this.router.navigate(["/order"]);
  }
}
