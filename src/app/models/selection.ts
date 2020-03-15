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
}