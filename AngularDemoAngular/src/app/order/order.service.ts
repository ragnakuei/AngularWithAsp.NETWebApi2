import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { OrderList } from '../models/OrderList';
import { Order } from '../models/Order';
import { Observable, of } from 'rxjs';

@Injectable()
export class OrderService {

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(private httpClient: HttpClient) { }

	getList() {
		return this.httpClient.get<OrderList[]>(environment.apiHost + "order/list", { observe: 'response' })
			.pipe(
				tap(_ => this.log('get order list')),
				catchError( error => this.handleError<OrderList[]>('get order list'))
			);
	}

	getOrder(orderId: number): Observable<Order> {
		return this.httpClient.get<Order>(environment.apiHost + "order/detail/" + orderId, { observe: 'response' })
			.pipe(
				map(resp => resp.body),
				tap(_ => this.log('get order id:' + orderId)),
				catchError(error => this.handleError<Order>('get order'))
			);
	}

	createOrder(order: Order) {
		return this.httpClient.post<number>(environment.apiHost + "order/create", order, this.httpOptions)
			.pipe(
				tap(_ => this.log('create order')),
				catchError(error => this.handleError<number>('create order'))
			);
	}

	updateOrder(order: Order) {
		return this.httpClient.put<number>(environment.apiHost + "order/" + order.OrderID, order, this.httpOptions)
			.pipe(
				tap(_ => this.log('update order id:' + order.OrderID)),
				catchError(error => this.handleError<number>('update order', + order.OrderID))
			);
	}

	deleteOrder(orderId: number) {
		return this.httpClient.delete<number>(environment.apiHost + "order/delete" + orderId, this.httpOptions)
			.pipe(
				tap(_ => this.log('delete order id:' + orderId)),
				catchError(this.handleError<number>('delete order', orderId))
			);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	private log(message: string) {
		console.log(message);
	}
}
