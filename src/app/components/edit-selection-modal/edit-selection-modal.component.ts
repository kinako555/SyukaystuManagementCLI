import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';

import { Selection } from "../../models/selection";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
import { Company } from "../../models/company";
import { SelectionStatus } from "../../models/selection-status";

import { SelectionHttpService } from "../../servicese/selection-http.service";
import { CompanyHttpService } from "../../servicese/company-http.service";

@Component({
  selector: 'app-edit-selection-modal',
  templateUrl: './edit-selection-modal.component.html',
  styleUrls: ['./edit-selection-modal.component.css']
})
export class EditSelectionModalComponent implements OnInit {
  applicationWay  : ApplicationWay  = new ApplicationWay();
  season          : Season          = new Season();
  selectionStauts : SelectionStatus = new SelectionStatus();
  selection       : Selection       = new Selection();
  updatedValues   : Object = {};


  @Output() posted = new EventEmitter();
  @Input() company;
  @Input() choicese;

  constructor(private activeModal: NgbActiveModal,
              private selectionHttpService: SelectionHttpService,
              private companyHttpService: CompanyHttpService) { }

    ngOnInit() {}

      // 登録ボタン
  // companyを登録する際は、登録後のcompany_idを受け取りselectionにつける
  submit() {
    this.updateValues();
    this.activeModal.close();
  }

  // キャンセルボタン
  cancel() { this.activeModal.close(); }

  private updateValues(): void{
    this.updateCompany();
    this.updateSelection();
  }

    // company作成
  // 作成後のidを返す
  private updateCompany(): void{
    this.companyHttpService.update(this.company)
      .subscribe((value :any) =>{ 
        console.log('updatedCompany');
        this.updatedValues['company'] = value['company'];
      })
  }

  // selection作成
  private updateSelection(): void{
    this.selectionHttpService.update(this.selection)
      .subscribe((value :any) =>{ 
        console.log('updatedSelection');
        this.selection = value['selection'];
        this.updatedValues['selection'] = this.selection;
        this.posted.emit(this.updatedValues);
      })
  }

}
