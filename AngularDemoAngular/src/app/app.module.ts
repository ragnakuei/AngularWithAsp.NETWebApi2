import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

// Angular Material
import { MatNativeDateModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';

// Service
import { OrderService } from "./order/order.service";
import { SidenavService } from './sidenav.service';

// Component
import { HomeComponent } from "./home/home.component";
import { OrderComponent } from "./order/order.component";
import { OrderListComponent } from "./order/order-list/order.list.component";
import { OrderDetailComponent } from "./order/order-detail/order-detail.component";
import { OrderEditComponent } from "./order/order-edit/order-edit.component";
import { OrderCreateComponent } from "./order/order-create/order-create.component";
import { OrderDeleteComponent } from "./order/order-delete/order-delete.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppSidenavComponent } from './app-sidenav/app-sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderEditComponent,
    OrderCreateComponent,
    OrderDeleteComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppSidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [OrderService, SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule {}
