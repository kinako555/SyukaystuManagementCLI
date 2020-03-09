import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { Selection } from "../../models/selection";
import { Choicese }  from "../../models/choicese";
import { Company }   from "../../models/company";
import { SelectedCompany } from "../../models/selected-company";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
import { SelectionStatus } from "../../models/selection-status";

@Component({
  selector: 'app-new-selection-modal',
  templateUrl: './new-selection-modal.component.html',
  styleUrls: ['./new-selection-modal.component.css']
})
export class NewSelectionModalComponent extends SimpleModalComponent<SelectedCompany, boolean> implements SelectedCompany{
  choicese: Choicese;
  applicationWay: ApplicationWay= new ApplicationWay();
  company: Company= new Company();
  season : Season= new Season();
  selectionStauts: SelectionStatus= new SelectionStatus();

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
