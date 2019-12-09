import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderList } from "src/app/models/OrderList";
import { OrderService } from "../order.service";

@Component({
    templateUrl: "./order.list.component.html",
    styles: [],
})
export class OrderListComponent implements OnInit {
    list: OrderList[] = [];

    constructor(
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.orderService.getList().subscribe(
            resp => {
                this.list = resp;
            },
            err => console.log("Error", err),
        );
    }

    onSelect(orderId: number) {
        console.log(orderId);
        this.router.navigate(["/order/detail/" + orderId]);
        // this.router.navigate(['../order/detail/', orderId], { relativeTo: this.route });
    }
}
