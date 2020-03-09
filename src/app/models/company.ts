import { CommonModel } from "./common-model";

export class Company implements CommonModel {
   id  : number;
   name: string;
   kana: string;
   link: string;
}