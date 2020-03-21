import { Model } from "./model";

export class Selection extends Model {
    company_id: number;
    remarks   : string;
    documents_password: string;
    next_appointment : Date;
    password: string;
    selection_status_id: number;
    application_way_id : number;
    season_id         : number;

    setValues(formValue: Object): void {
        if (formValue['season_id'] !== undefined) this.season_id           = formValue['season_id'];
        if (formValue['season_id'] !== undefined) this.application_way_id  = formValue['application_way_id'];
        if (formValue['season_id'] !== undefined) this.selection_status_id = formValue['selection_status_id'];
        if (formValue['season_id'] !== undefined) this.documents_password  = formValue['documents_password'];
    }
}