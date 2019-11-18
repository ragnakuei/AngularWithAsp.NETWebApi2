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
                            resp => {

                                this.orderForm.setValue({
                                    OrderID: resp.body.OrderID,
                                    CustomerID: resp.body.CustomerID,
                                    EmployeeID: resp.body.EmployeeID,
                                    OrderDate: resp.body.OrderDate,
                                    RequiredDate: resp.body.RequiredDate,
                                    ShippedDate: resp.body.ShippedDate,
                                    ShipVia: resp.body.ShipVia,
                                    Freight: resp.body.Freight,
                                    ShipName: resp.body.ShipName,
                                    ShipAddress: resp.body.ShipAddress,
                                    ShipCity: resp.body.ShipCity,
                                    ShipRegion: resp.body.ShipRegion,
                                    ShipPostalCode: resp.body.ShipPostalCode,
                                    ShipCountry: resp.body.ShipCountry,
                                    // Detail: resp.body.Detail
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
