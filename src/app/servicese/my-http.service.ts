import { Injectable } from '@angular/core';

import { Observable, throwError, } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

const HOST_URI: string = "http://localhost:3000";
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded' 
  })
};

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  constructor(
    private http: HttpClient
  ) { }

  // 初期表示値を取得 TODO: URI名をHomeなどに変える
  // /selections
  get_initialize_values(): Observable<any> {
    return this.http.get(HOST_URI,HTTP_OPTIONS)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  // 選考検索
  // /selections?name=hoge&season_id=1
  get_search_companys(query: string): Observable<any> {
    let uri = HOST_URI + '/selections' + query
    return this.http.get(uri, HTTP_OPTIONS)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  // エラーハンドリング
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message)
    }else {
       // The backend returned an unsuccessful response code.
       // The response body may contain clues as to what went wrong,
       console.error(
         `Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);
    }
     // return an observable with a user-facing error message
     return throwError('Something bad happened; please try againlater.');
  };
}
