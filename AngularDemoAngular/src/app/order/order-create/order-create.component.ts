import { Location } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, tap } from "rxjs/operators";
import { CustomerOption } from "src/app/models/CustomerOption";
import { Order } from "src/app/models/Order";
import { OptionsService } from "src/app/options.service";
import { OrderService } from "../order.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-order-create",
  styleUrls: ["./order-create.component.css"],
  templateUrl: "./order-create.component.html"
})
export class OrderCreateComponent implements OnInit {
  public orderForm: FormGroup;
  public customerOptions: CustomerOption[] = [];

  constructor(
    private orderService: OrderService,
    private optionsService: OptionsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit() {
    this.orderForm = new FormGroup({
      CustomerID: new FormControl(""),
      Details: new FormArray([]),
      EmployeeID: new FormControl(""),
      Freight: new FormControl(""),
      OrderDate: new FormControl(""),
      RequiredDate: new FormControl(""),
      ShipAddress: new FormControl(""),
      ShipCity: new FormControl(""),
      ShipCountry: new FormControl(""),
      ShipName: new FormControl(""),
      ShipPostalCode: new FormControl(""),
      ShipRegion: new FormControl(""),
      ShipVia: new FormControl(""),
      ShippedDate: new FormControl("")
    });

    this.orderForm
      .get("CustomerID")
      .valueChanges.pipe(
        debounceTime(300),
        tap(val => {
          console.log("keyword:" + val);
        })
      )
      .subscribe(inputKeyword => {
        if (typeof inputKeyword === "string") {
          this.optionsService.getCusomers(inputKeyword).subscribe(
            queryOptions => {
              this.customerOptions = queryOptions;
            },
            err => console.log("Error", err)
          );
        }
      });
  }

  public highlightFiltered(customerName: string) {

    console.log('highlightFiltered');

    const inputCustomerKeyword = this.orderForm.get("CustomerID").value;
    if (typeof inputCustomerKeyword === "string") {
      const pattern = inputCustomerKeyword
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        .split(" ")
        .filter(t => t.length > 0)
        .join("|");
      const regex = new RegExp(pattern, "gi");

      return inputCustomerKeyword
        ? customerName.replace(regex, match => `<span class="autocomplete-highlight">${match}</span>`)
        : customerName;
    }
    return customerName;
  }

  public addDetails() {
    (this.orderForm.get("Details") as FormArray).push(
      new FormGroup({
        ProductID: new FormControl(""),
        UnitPrice: new FormControl(""),
        Quantity: new FormControl(""),
        Discount: new FormControl("")
      })
    );
  }

  public onSubmit(submitData: Order) {
    if (typeof submitData.CustomerID === "object") {
      submitData.CustomerID = (submitData.CustomerID as CustomerOption).CustomerID;
    }
    this.orderService.createOrder(submitData).subscribe(
      val => {
        this.router.navigate(["/order/detail/" + val]);
      },
      err => console.log("Error", err)
    );
  }

  public backToPreviousPage() {
    this.location.back();
  }

  public displayCustomer(customOption: CustomerOption): string {
    if (customOption) {
      return `${customOption.CustomerID} / ${customOption.CompanyName}`;
    } else {
      return "";
    }
  }

  public onCustomerOptionChanged(e: MatAutocompleteSelectedEvent) {}
}
