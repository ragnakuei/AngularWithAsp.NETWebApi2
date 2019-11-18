import { Component, OnInit, Input } from '@angular/core';
import { OrderList } from 'src/app/models/OrderList';

@Component({
  selector: '[app-order-item]',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() orderList: OrderList;

  constructor() { }

  ngOnInit() {
  }
}
