import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
        private router: Router,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {

        // this.orderForm = new FormGroup({
        //     OrderID: new FormControl(''),
        //     CustomerID: new FormControl(''),
        //     EmployeeID: new FormControl(''),
        //     OrderDate: new FormControl(''),
        //     RequiredDate: new FormControl(''),
        //     ShippedDate: new FormControl(''),
        //     ShipVia: new FormControl(''),
        //     Freight: new FormControl(''),
        //     ShipName: new FormControl(''),
        //     ShipAddress: new FormControl(''),
        //     ShipCity: new FormControl(''),
        //     ShipRegion: new FormControl(''),
        //     ShipPostalCode: new FormControl(''),
        //     ShipCountry: new FormControl(''),
        //     // Detail : new FormGroup({
        //     //     ProductID : new FormControl(''),
        //     //     UnitPrice : new FormControl(''),
        //     //     Quantity : new FormControl(''),
        //     //     Discount : new FormControl(''),
        //     // })[0]
        // });

        // this.orderForm = this.fb.group(
        //     {
        //         OrderID: [''],
        //         CustomerID: ['', Validators.required],
        //         EmployeeID: [''],
        //         OrderDate: [''],
        //         RequiredDate: [''],
        //         ShippedDate: [''],
        //         ShipVia: [''],
        //         Freight: [''],
        //         ShipName: [''],
        //         ShipAddress: [''],
        //         ShipCity: [''],
        //         ShipRegion: [''],
        //         ShipPostalCode: [''],
        //         ShipCountry: [''],
        //         Detail: this.fb.array([this.fb.group({
        //             ProductID: [''],
        //             UnitPrice: [''],
        //             Quantity: [''],
        //             Discount: [''],
        //         })])
        //     });

// console.log(this.orderForm.value);

        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = params['id'];
                    this.orderService.getOrder(this.id)
                        .subscribe(
                            responseOrder => {
                                this.orderForm = this.formBuilder.group(
                                    {
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
                                        Details: this.formBuilder.array(responseOrder.Details.map(detail => 
                                            this.formBuilder.group({
                                                ProductID: [detail.ProductID],
                                                UnitPrice: [detail.UnitPrice],
                                                Quantity: [detail.Quantity],
                                                Discount: [detail.Discount],
                                            })
                                        ))
                                    });
                            },
                            err => console.log('Error', err));
                }
            );
    }

    addDetails()
    {
        (this.orderForm.get('Details') as FormArray).push(this.formBuilder.group({
            ProductID: [''],
            UnitPrice: [''],
            Quantity: [''],
            Discount: [''],
        }));
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
