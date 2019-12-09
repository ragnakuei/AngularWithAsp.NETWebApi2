import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Service
import { OrderService } from './order/order.service';

// Component
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order/order-list/order.list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderItemComponent } from './order/order-list/order-item/order-item.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderDeleteComponent } from './order/order-delete/order-delete.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        OrderComponent,
        OrderListComponent,
        OrderDetailComponent,
        OrderItemComponent,
        OrderEditComponent,
        OrderCreateComponent,
        OrderDeleteComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [OrderService],
    bootstrap: [AppComponent],
})
export class AppModule {}
