import { Injectable, Output } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({ providedIn: "root" })
export class SidenavService {
  constructor() {}

  public sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }
}
