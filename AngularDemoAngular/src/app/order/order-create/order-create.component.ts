import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';

@Component({
    selector: 'app-order-create',
    templateUrl: './order-create.component.html',
    styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

    orderForm: FormGroup;

    constructor(private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.orderForm = new FormGroup({
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
    }

    onSubmit(submitData: Order) {
        this.orderService.createOrder(submitData)
            .subscribe(
                val => {
                    this.router.navigate(['/order/' + val]);
                },
                response => {
                    console.log("PUT call in error", response);
                },
                () => {
                    console.log("The PUT observable is now completed.");
                }
            );
    }

}
