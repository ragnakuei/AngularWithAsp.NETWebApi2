import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CustomerOption } from "./models/CustomerOption";
import { map } from "rxjs/internal/operators/map";
import { tap } from "rxjs/internal/operators/tap";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class OptionsService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private httpClient: HttpClient) {}

  getCusomers(keyword: string) : Observable<CustomerOption[]> {
    return this.httpClient
      .get<CustomerOption[]>(environment.apiHost + "options/customers", {
        params: {
          keyword: keyword
        },
        observe: "response"
      })
      .pipe(
        map(resp => resp.body),
        tap(_ => this.log("get Cusomers"))
      );
  }

  private log(message: string) {
    console.log(message);
  }
}
