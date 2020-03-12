import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class SelectionStatus implements Model, SelectionValue {
	id  : number;
	name: string;
}