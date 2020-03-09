import { Injectable } from '@angular/core';

import { CommonModel } from "../models/common-model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  // モデル配列からID検索する
  // 検索結果の名前返す
  //存在しない場合はnullを返す
  find_name(velues: CommonModel[], id: number) :string {
    let value = velues.find(v => v.id === id);
    return value ? value.name : null;
  }

  // モデル配列からID検索する
  // 検索結果のmodelを返す
  // 存在しない場合はnullを返す
  find(velues: CommonModel[], id: number) :any {
    let value = velues.find(v => v.id === id);
    return value ? value : null;
  }
}
