import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtml } from '@angular/platform-browser';

import { Selection } from "../../models/selection";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
import { Company } from "../../models/company";
import { SelectionStatus } from "../../models/selection-status";
import { InputValues } from "../../models/input-values";
import { Choicese } from 'src/app/models/choicese';

import { InputSelectionModal } from "../../shared/input-selection-modal";

import { SelectionHttpService } from "../../servicese/selection-http.service";
import { CompanyHttpService } from "../../servicese/company-http.service";
import { InputModalService } from "../../servicese/input-modal.service";




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
  inputValues: InputValues = new InputValues();

  selectionForm: FormGroup;
  isSubmited: Boolean = false; // 実行ボタンを押したか TODO:別方法検証

  @Output() posted = new EventEmitter();
  @Input() selection: Selection;
  @Input() company  : Company;
  @Input() choicese : Choicese;

  constructor(private activeModal: NgbActiveModal,
              private selectionHttpService: SelectionHttpService,
              private companyHttpService: CompanyHttpService,
              private inputModalService: InputModalService) { }

  ngOnInit() {
    this.setForm();
  }

  // 登録ボタン
  // companyを登録する際は、登録後のcompany_idを受け取りselectionにつける
  onSubmit() {
    this.isSubmited = true;
    if (this.selectionForm.invalid) return;
    this.selection.setValues(this.selectionForm.value);
    this.company.setValues(this.selectionForm.value.companyForm);
    this.setInputValues();
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

  private setForm():void {
    this.selectionForm = this.inputModalService.selectionForm(this.selection);
    this.selectionForm.addControl('companyForm', this.inputModalService.companyForm(this.company));
  }

  private setInputValues():void{
    this.inputValues.company   = this.company;
    this.inputValues.selection = this.selection;
  }

    // company作成
  // 作成後のidを返す
  private updateCompany(): void{
    this.companyHttpService.update(this.inputValues.company)
      .subscribe((value :any) =>{ 
        console.log('updatedCompany');
        // view更新時にレスポンスを受け取れない可能性を考慮してレスポンスではなくeditCompanyを使用
      })
  }

  // selection作成
  private updateSelection(): void{
    this.selectionHttpService.update(this.inputValues.selection)
      .subscribe((value :any) =>{ 
        console.log('updatedSelection');
        // view更新時にレスポンスを受け取れない可能性を考慮してレスポンスではなくeditSelectionを使用
      })
  }

  // view更新時にレスポンスを受け取れない可能性を考慮して
  private setUpdateValues():void {
    this.updatedValues['company']   = this.company;
    this.updatedValues['selection'] = this.selection;
  }

  get companyName() { return this.selectionForm.get('companyForm').get('name') }
  get companyKana() { return this.selectionForm.get('companyForm').get('kana') }
  get companyLink() { return this.selectionForm.get('companyForm').get('link') }
  get documentsPassword() { return this.selectionForm.get('documents_password') }
  get seasonId() { return this.selectionForm.get('season_id') }

}
