import { Injectable } from '@angular/core';

import { SelectionValue } from "../models/selection-value";
import { Model } from "../models/model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  // モデル配列からID検索する
  // 検索結果の名前返す
  //存在しない場合はnullを返す
  find_name(models: SelectionValue[], id: number) :string {
    let model = models.find(v => v.id === id);
    return model ? model.name : null;
  }

  // モデル配列からID検索する
  // 検索結果のmodelを返す
  // 存在しない場合はnullを返す
  find(models: Model[], id: number) :any {
    let model = models.find(v => v.id === id);
    return model ? model : null;
  }

  // idに該当しない要素で配列を作る(idより削除)
  delete(models: Model[], id: number) :any {
    const rtn_models = models.filter(x => x.id !== id)

    return rtn_models;
  }

  update(models: Model[], model: Model) :any {
    models.forEach(element => {
        if (element.id == model.id) element = model;
    });
    return models;
  }
}
