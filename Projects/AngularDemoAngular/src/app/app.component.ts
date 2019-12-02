import { Component, OnInit, ViewChild } from "@angular/core";
import { SidenavService } from "./sidenav.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: []
})
export class AppComponent implements OnInit {
  title = "my-app";

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {}
}
