import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: "app-sidenav",
  templateUrl: "./app-sidenav.component.html",
  styleUrls: ["./app-sidenav.component.css"]
})
export class AppSidenavComponent implements OnInit {
  @ViewChild('sideNav', {static: true})
  private sideNav : MatSidenav;

  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sideNav);
  }
}
