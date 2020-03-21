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
    const uri = this.myHttpService.hostUri() + '/company';
    const params = {'company': company};
    return this.http.post(uri, params)
      .pipe(
        retry(3),
        catchError(this.myHttpService.handleError)
      )
  }

  update(company: Company): Observable<any> {
    const uri = this.myHttpService.hostUri() + '/companies/' + company.id;
    const params = {'company': company};
    return this.http.patch(uri, params)
      .pipe(
        retry(3),
        catchError(this.myHttpService.handleError)
      )
  }
  
}
