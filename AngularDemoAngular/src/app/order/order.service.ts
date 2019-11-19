import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { OrderList } from '../models/OrderList';
import { Order } from '../models/Order';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class OrderService {

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(private httpClient: HttpClient) { }

	getList() : Observable<OrderList[]>  {
		return this.httpClient.get<OrderList[]>(environment.apiHost + "order/list", { observe: 'response' })
			.pipe(
				map(resp => resp.body),
				tap(_ => this.log('get order list')),
			);
	}

	getOrder(orderId: number): Observable<Order> {
		return this.httpClient.get<Order>(environment.apiHost + "order/detail/" + orderId, { observe: 'response' })
			.pipe(
				map(resp => resp.body),
				tap(_ => this.log('get order id:' + orderId)),
			);
	}

	createOrder(order: Order) {
		return this.httpClient.post<number>(environment.apiHost + "order/create", order, this.httpOptions)
			.pipe(
				tap(_ => this.log('create order')),
			);
	}

	updateOrder(order: Order) {
		return this.httpClient.put<number>(environment.apiHost + "order/" + order.OrderID, order, this.httpOptions)
			.pipe(
				tap(_ => this.log('update order id:' + order.OrderID)),
			);
	}

	deleteOrder(orderId: number) {
		return this.httpClient.delete<number>(environment.apiHost + "order/delete" + orderId, this.httpOptions)
			.pipe(
				tap(_ => this.log('delete order id:' + orderId)),
			);
	}

	private log(message: string) {
		console.log(message);
	}
}
