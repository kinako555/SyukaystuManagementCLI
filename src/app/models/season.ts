import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class Season implements Model, SelectionValue{
	id  : number;
	name: string;
}