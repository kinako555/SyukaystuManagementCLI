import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  // モデル配列からID検索する
  // モデルを返す
  find_value(velues: PossessedSelection[], id: number) :PossessedSelection {
    return velues.find(v => v.id === id);
  }

  // モデル配列からID検索する
  // 検索結果の名前返す
  find_name(velues: PossessedSelection[], id: number) :string {
    return velues.find(v => v.id === id).name;
  }
}
