import { Component, OnInit, Inject } from "@angular/core";
import { OrderService } from "../order.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { of } from 'rxjs';

@Component({
  selector: "app-order-confirm-delete-dialog",
  templateUrl: "./order-confirm-delete-dialog.component.html",
  styleUrls: ["./order-confirm-delete-dialog.component.css"]
})
export class OrderConfirmDeleteDialogComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<OrderConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderId: number
  ) {}

  ngOnInit() {}

  clickConfirm() {
    this.orderService.deleteOrder(this.orderId).subscribe(
      val => {
        console.log(`delte orderId:${this.orderId} ok`);
        this.dialogRef.close(true);
      },
      err => console.log("Error", err)
    );
  }

  clickCancel() {
    this.dialogRef.close(false);
  }
}
