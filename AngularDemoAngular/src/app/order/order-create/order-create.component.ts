import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { Location } from "@angular/common";
import { OrderService } from "../order.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Order } from "src/app/models/Order";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { debounceTime, tap } from "rxjs/operators";
import { OptionsService } from "src/app/options.service";
import { CustomerOption } from "src/app/models/CustomerOption";

@Component({
  selector: "app-order-create",
  templateUrl: "./order-create.component.html",
  styleUrls: ["./order-create.component.css"]
})
export class OrderCreateComponent implements OnInit {
  orderForm: FormGroup;
  customerOptions: CustomerOption[];

  constructor(
    private orderService: OrderService,
    private optionsService: OptionsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderForm = new FormGroup({
      CustomerID: new FormControl(""),
      EmployeeID: new FormControl(""),
      OrderDate: new FormControl(""),
      RequiredDate: new FormControl(""),
      ShippedDate: new FormControl(""),
      ShipVia: new FormControl(""),
      Freight: new FormControl(""),
      ShipName: new FormControl(""),
      ShipAddress: new FormControl(""),
      ShipCity: new FormControl(""),
      ShipRegion: new FormControl(""),
      ShipPostalCode: new FormControl(""),
      ShipCountry: new FormControl(""),
      Details: new FormArray([])
    });

    this.orderForm
      .get("CustomerID")
      .valueChanges.pipe(
        debounceTime(300),
        tap(val => console.log("keyword:" + val))
      )
      .subscribe(inputKeyword => {
        this.optionsService.getCusomers(inputKeyword).subscribe(
          queryOptions => {
            this.customerOptions = queryOptions;
          },
          err => console.log("Error", err)
        );
      });
  }

  highlightFiltered(customerName: string) {
    const inputCustomerKeyword = this.orderForm.get("CustomerID").value;

    console.log("inputCustomerKeyword:" + inputCustomerKeyword);

    const result = customerName.replace(
      inputCustomerKeyword,
      `<span class="autocomplete-highlight">${inputCustomerKeyword}</span>`
    );

console.log(result);

    return result;
  }

  addDetails() {
    (this.orderForm.get("Details") as FormArray).push(
      new FormGroup({
        ProductID: new FormControl(""),
        UnitPrice: new FormControl(""),
        Quantity: new FormControl(""),
        Discount: new FormControl("")
      })
    );
  }

  onSubmit(submitData: Order) {
    this.orderService.createOrder(submitData).subscribe(
      val => {
        this.router.navigate(["/order/detail/" + val]);
      },
      err => console.log("Error", err)
    );
  }

  backToPreviousPage() {
    this.location.back();
  }
}
