import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { MyHttpService } from './my-http.service';
import { Company } from "../models/company";


@Injectable({
  providedIn: 'root'
})
export class CompanyHttpService {

  constructor(
    private http: HttpClient,
    private myHttpService: MyHttpService
  ) { }

  create(company: Company): Observable<any> {
    let uri = this.myHttpService.hostUri() + '/company';
    let params = {'company': company};
    return this.http.post(uri, params)
      .pipe(
        retry(3),
        catchError(this.myHttpService.handleError)
      )
  }
  
}
