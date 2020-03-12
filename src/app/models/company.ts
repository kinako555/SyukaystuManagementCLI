import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class Company implements Model, SelectionValue {
   id  : number;
   name: string;
   kana: string;
   link: string;
}