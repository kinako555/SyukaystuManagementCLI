import { Season } from "./season";
import { SelectionStatus } from "./selection-status";
import { ApplicationWay } from "./application-way";

export class Selection {
	"id"  : string;
    "company_name": string;
    "company_kana": string;
    "company_link": string;
    "remarks"     : string;
    "next_appointment"  : Date;
    "selection_stauts"  : SelectionStatus;
    "application_way_id": ApplicationWay;
    "seasson": Season;
}