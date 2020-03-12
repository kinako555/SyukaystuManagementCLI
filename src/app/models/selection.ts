export class Selection {
	id: number;
    company_id: number;
    remarks   : string;
    documents_password: string;
    next_appointment : Date;
    password: string;
    selection_status_id: number;
    application_way_id : number;
    season_id         : number;

    // idに該当しない要素で配列を作る(idより削除)
  static delete(models: Selection[], id: number) :any {
    const rtn_models = models.filter(x => x.id !== id)

    return rtn_models;
  }

  // モデル配列からID検索する
  // 検索結果のmodelを返す
  // 存在しない場合はnullを返す
  static find(selections: Selection[], id: number) :any {
    let selection = selections.find(v => v.id === id);
    return selection ? selection : null;
  }
}