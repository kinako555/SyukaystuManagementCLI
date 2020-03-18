import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor() { }

  // フォームチェック
  isInvalid(value: any) {
    return value.invalid && (value.dirty || value.touched);
  }
}
