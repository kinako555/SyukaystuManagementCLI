import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class ApplicationWay extends Model implements SelectionValue{
	id  : number;
	name: string;
}