import { Model } from "./model";

export class Selection implements Model {
	  id: number;
    company_id: number;
    remarks   : string;
    documents_password: string;
    next_appointment : Date;
    password: string;
    selection_status_id: number;
    application_way_id : number;
    season_id         : number;
}