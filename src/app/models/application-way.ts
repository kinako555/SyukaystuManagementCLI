import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class ApplicationWay implements Model, SelectionValue{
	id  : number;
	name: string;
}