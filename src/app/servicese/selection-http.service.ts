import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { MyHttpService } from './my-http.service';
import { Selection } from "../models/selection";


@Injectable({
  providedIn: 'root'
})
export class SelectionHttpService {

  constructor(
    private http: HttpClient,
    private myHttpService: MyHttpService
  ) { }

  //get /selections?name=hoge&season_id=1
  search(query: string): Observable<any> {
    const uri = this.myHttpService.hostUri() + '/selections' + query
    return this.http.get(uri)
      .pipe(
        retry(3),
        catchError(this.myHttpService.handleError)
      )
  }

  //delete /selections/1
  delete(id: number): Observable<any> {
    const uri = this.myHttpService.hostUri() + '/selections/' + id
    return this.http.delete(uri)
      .pipe(
        retry(3),
        catchError(this.myHttpService.handleError)
      )
  }

  create(selection: Selection): Observable<any> {
    const params = {'selection': selection};
    const uri = this.myHttpService.hostUri() + '/selection';
    return this.http.post(uri, params)
      .pipe(
        retry(3),
        catchError(this.myHttpService.handleError)
      )
  }

  update(selection: Selection): Observable<any> {
    const params = {'selection': selection};
    const uri = this.myHttpService.hostUri() + '/selection/' + selection.id;
    return this.http.patch(uri, params)
      .pipe(
        retry(3),
        catchError(this.myHttpService.handleError)
      )
  }
}
