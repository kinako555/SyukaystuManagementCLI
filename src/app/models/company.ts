import { CommonModel } from "./CommonModel";

export class Company implements CommonModel {
   id  : number;
   name: string;
   kana: string;
   link: string;
}