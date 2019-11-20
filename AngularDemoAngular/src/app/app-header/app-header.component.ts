import { Component, OnInit, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SidenavService } from "../sidenav.service";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.css"]
})
export class AppHeaderComponent implements OnInit {

  get sideNav() : MatSidenav {
    return this.sidenavService.sidenav;
  }

  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit() {
  }
}
