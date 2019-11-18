import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Order } from 'src/app/models/Order';

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

    id: number;
    orderForm: FormGroup;

    constructor(private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.orderForm = new FormGroup({
            OrderID: new FormControl(''),
            CustomerID: new FormControl(''),
            EmployeeID: new FormControl(''),
            OrderDate: new FormControl(''),
            RequiredDate: new FormControl(''),
            ShippedDate: new FormControl(''),
            ShipVia: new FormControl(''),
            Freight: new FormControl(''),
            ShipName: new FormControl(''),
            ShipAddress: new FormControl(''),
            ShipCity: new FormControl(''),
            ShipRegion: new FormControl(''),
            ShipPostalCode: new FormControl(''),
            ShipCountry: new FormControl(''),
            // Detail : new FormGroup({
            //     ProductID : new FormControl(''),
            //     UnitPrice : new FormControl(''),
            //     Quantity : new FormControl(''),
            //     Discount : new FormControl(''),
            // })[0]
        });

        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = params['id'];
                    this.orderService.getOrder(this.id)
                        .subscribe(
                            responseOrder => {

                                this.orderForm.setValue({
                                    OrderID: responseOrder.OrderID,
                                    CustomerID: responseOrder.CustomerID,
                                    EmployeeID: responseOrder.EmployeeID,
                                    OrderDate: responseOrder.OrderDate,
                                    RequiredDate: responseOrder.RequiredDate,
                                    ShippedDate: responseOrder.ShippedDate,
                                    ShipVia: responseOrder.ShipVia,
                                    Freight: responseOrder.Freight,
                                    ShipName: responseOrder.ShipName,
                                    ShipAddress: responseOrder.ShipAddress,
                                    ShipCity: responseOrder.ShipCity,
                                    ShipRegion: responseOrder.ShipRegion,
                                    ShipPostalCode: responseOrder.ShipPostalCode,
                                    ShipCountry: responseOrder.ShipCountry,
                                    // Detail: resp.Detail
                                });
                            });
                }
            );
    }

    onSubmit(submitData: Order) {
        this.orderService.updateOrder(submitData)
        .subscribe(
            val => {
                this.router.navigate(['/order/' + val]);
            },
            response => {
                console.log("PUT call in error", response);
            }
        );
    }
}
