import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Order } from 'src/app/models/Order';

@Component({
	selector: 'app-order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

	id: number;
	order: Order;

	constructor(private orderService: OrderService,
		private route: ActivatedRoute,
		private router: Router) {
	}

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.orderService.getOrder(this.id)
						.subscribe(
							responseOrder => {
								this.order = responseOrder;
							});
				}
			);
	}
}
