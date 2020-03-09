import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Selection } from "../../models/selection";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
import { SelectionStatus } from "../../models/selection-status";

@Component({
  selector: 'app-new-selection-modal',
  templateUrl: './new-selection-modal.component.html',
  styleUrls: ['./new-selection-modal.component.css']
})
export class NewSelectionModalComponent {
  applicationWay: ApplicationWay= new ApplicationWay();
  season : Season= new Season();
  selectionStauts: SelectionStatus= new SelectionStatus();
  selection : Selection = new Selection();

  @Input() company;
  @Input() choicese;

  constructor(public activeModal: NgbActiveModal) { }

  //companyが選択されたか
  isCompany(): boolean{ 
    return this.company.id ? true : false;
  }

  submit() {
    //処理
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}
