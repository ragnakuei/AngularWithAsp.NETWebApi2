import { Injectable, Output } from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
  constructor() {}

  public sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }
}
