import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Selection } from "../../models/selection";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
import { Company } from "../../models/company";
import { SelectionStatus } from "../../models/selection-status";

import { SelectionHttpService } from "../../servicese/selection-http.service";
import { CompanyHttpService } from "../../servicese/company-http.service";
import { Choicese } from 'src/app/models/choicese';

@Component({
  selector: 'app-edit-selection-modal',
  templateUrl: './edit-selection-modal.component.html',
  styleUrls: ['./edit-selection-modal.component.css']
})
export class EditSelectionModalComponent implements OnInit {
  applicationWay : ApplicationWay  = new ApplicationWay();
  season         : Season          = new Season();
  selectionStauts: SelectionStatus = new SelectionStatus();
  updatedValues  : Object = {};
  editCompany    : Company;
  editSelection  : Selection;

  @Output() posted = new EventEmitter();
  @Input() selection: Selection;
  @Input() company  : Company;
  @Input() choicese : Choicese;

  constructor(private activeModal: NgbActiveModal,
              private selectionHttpService: SelectionHttpService,
              private companyHttpService: CompanyHttpService) { }

  ngOnInit() {
    this.editCompany   = Company.duplication(this.company);
    this.editSelection = Selection.duplication(this.selection);
  }

  // 登録ボタン
  // companyを登録する際は、登録後のcompany_idを受け取りselectionにつける
  submit() {
    this.updateValues();
    this.setUpdateValues();
    this.posted.emit(this.updatedValues);
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
    this.companyHttpService.update(this.editCompany)
      .subscribe((value :any) =>{ 
        console.log('updatedCompany');
        // view更新時にレスポンスを受け取れない可能性を考慮してレスポンスではなくeditCompanyを使用
      })
  }

  // selection作成
  private updateSelection(): void{
    this.selectionHttpService.update(this.selection)
      .subscribe((value :any) =>{ 
        console.log('updatedSelection');
        // view更新時にレスポンスを受け取れない可能性を考慮してレスポンスではなくeditSelectionを使用
      })
  }

  // view更新時にレスポンスを受け取れない可能性を考慮して
  private setUpdateValues():void {
    this.updatedValues['company']   = this.editCompany;
    this.updatedValues['selection'] = this.editSelection;
  }

}
