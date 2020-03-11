export class Selection {
	id: number;
    company_id: number;
    remarks   : string;
    documents_password: string;
    next_appointment : Date;
    password: string;
    selection_stauts_id: number;
    application_way_id : number;
    seasson_id         : number;

    // idに該当しない要素で配列を作る(idより削除)
  delete(models: Selection[], id: number) :any {
    const rtn_models = models.filter(x => x.id !== id)

    return rtn_models;
  }
}