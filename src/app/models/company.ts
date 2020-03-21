import { SelectionValue } from "./selection-value";
import { Model } from "./model";

export class Company extends Model implements SelectionValue {
   name: string;
   kana: string;
   link: string;

   setValues(formValue: Object): void {
      if (formValue['name'] !== undefined) this.name = formValue['name'];
      if (formValue['kana'] !== undefined) this.kana = formValue['kana'];
      if (formValue['link'] !== undefined) this.link = formValue['link'];
  }
}