import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class Company extends Model implements SelectionValue {
   name: string;
   kana: string;
   link: string;

}