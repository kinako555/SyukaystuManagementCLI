import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { SelectedCompany } from "../../models/SelectedCompany";

@Component({
  selector: 'app-new-selection-modal',
  templateUrl: './new-selection-modal.component.html',
  styleUrls: ['./new-selection-modal.component.css']
})
export class NewSelectionModalComponent extends SimpleModalComponent<SelectedCompany, boolean> implements SelectedCompany{
  company_id   : number;
  company_name : string;
  company_kana : string;
  company_link : string;

  //companyが選択されたか
  isCompany(): boolean{ 
    return this.company_id ? true : false;
  }

  submit() {
    //処理
    this.close();
  }

  cancel() {
    this.close();
  }
}
