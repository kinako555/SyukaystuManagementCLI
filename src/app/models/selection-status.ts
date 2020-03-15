import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class SelectionStatus extends Model implements SelectionValue {
	name: string;
}