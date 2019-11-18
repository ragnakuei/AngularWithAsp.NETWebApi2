import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderList } from 'src/app/models/OrderList';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './order.list.component.html',
	styles: []
})
export class OrderListComponent implements OnInit {
	list: OrderList[] = [];

	constructor(private orderService: OrderService,
		private router: Router,
		private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.orderService.getList()
			.subscribe(
				resp => {
					for (var orderList of resp.body) {
						this.list.push(orderList);
					}
				});
	}

	onSelect(orderId: number) {
		console.log(orderId);
		this.router.navigate(['/order/' + orderId]);
		// this.router.navigate(['../order', orderId], { relativeTo: this.route });
	}
}
