import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order/order-list/order.list.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderDeleteComponent } from './order/order-delete/order-delete.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'order', component: OrderComponent
    , children: [
      { path: '', component: OrderListComponent },
      { path: 'create', component: OrderCreateComponent },
      { path: 'edit/:id', component: OrderEditComponent },
      { path: 'delete/:id', component: OrderDeleteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
