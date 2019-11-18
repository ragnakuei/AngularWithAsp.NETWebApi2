import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry, tap } from 'rxjs/operators';
import { OrderList } from '../models/OrderList';
import { Order } from '../models/Order';
import { throwError, Observable, of } from 'rxjs';

@Injectable()
export class OrderService {

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			//   'Authorization': 'my-auth-token'
		})
	};

	constructor(private httpClient: HttpClient) { }

	getList() {
		return this.httpClient.get<OrderList[]>(environment.apiHost + "order/list", { observe: 'response' });
	}

	getOrder(orderId: number) {
		return this.httpClient.get<Order>(environment.apiHost + "order/detail/" + orderId, { observe: 'response' });
	}

	createOrder(order: Order) {
		return this.httpClient.post<number>(environment.apiHost + "order/create", order, this.httpOptions);
	}

	updateOrder(order: Order) {
		return this.httpClient.put<number>(environment.apiHost + "order/" + order.OrderID, order, this.httpOptions);
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
