import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'app-order-delete',
    templateUrl: './order-delete.component.html',
    styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent implements OnInit {

    id: number;

    constructor(private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = params['id'];
                }
            );
    }

    private confirmDelete(orderId: number) {
        this.orderService.deleteOrder(orderId)
            .subscribe(
                val => {
                    this.router.navigate(['/order/']);
                },
                err => console.log('Error', err)
            );
    }
}
