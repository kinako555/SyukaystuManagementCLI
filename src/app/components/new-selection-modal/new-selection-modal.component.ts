import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { Selection } from "../../models/selection";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
import { Company } from "../../models/company";
import { SelectionStatus } from "../../models/selection-status";
import { Choicese } from 'src/app/models/choicese';

import { SelectionHttpService } from "../../servicese/selection-http.service";
import { CompanyHttpService } from "../../servicese/company-http.service";
import { InputModalService } from "../../servicese/input-modal.service";


@Component({
  selector: 'app-new-selection-modal',
  templateUrl: './new-selection-modal.component.html',
  styleUrls: ['./new-selection-modal.component.css']
})
export class NewSelectionModalComponent implements OnInit{
  applicationWay  : ApplicationWay  = new ApplicationWay();
  season          : Season          = new Season();
  selectionStauts : SelectionStatus = new SelectionStatus();
  selection       : Selection       = new Selection();
  selectionSubject: Subject<Company> = new Subject();
  createdValues   : Object = {};
  selectionState : Observable<Company> = this.selectionSubject.asObservable();
  selectionForm: FormGroup;
  isSubmited: Boolean = false; // 実行ボタンを押したか TODO:別方法検証

  @Output() posted = new EventEmitter();
  @Input() company : Company;
  @Input() choicese: Choicese;
  @Input() forms   : Object;

  constructor(private activeModal: NgbActiveModal,
              private selectionHttpService: SelectionHttpService,
              private companyHttpService: CompanyHttpService,
              private inputModalService: InputModalService) { }

  ngOnInit() {
    this.setForm();
    // create_companyのレスポンスを受け取ったあとで処理
    this.selectionState.subscribe((company) => {
      this.selection.company_id = company.id;
      this.createSelection();
    });
  }

  //companyが選択されたか
  isCompany(): boolean{ 
    return this.company.id !== undefined;
  }

  // 登録ボタン
  // companyを登録する際は、登録後のcompany_idを受け取りselectionにつける
  onSubmit() {
    //this.isSubmited = true;
    if (this.selectionForm.invalid) return;
    this.selection.setValues(this.selectionForm.value);
    if (this.isCompany()) {
      this.selection.company_id = this.company.id; 
      this.createSelection();
    } else {
      this.company.setValues(this.selectionForm.value.companyForm);
      this.createCompany(); 
    }
    this.activeModal.close();
  }

  // キャンセルボタン
  cancel() { this.activeModal.close(); }

  private setForm():void {
    this.selectionForm = this.inputModalService.selectionForm();
    let company = this.isCompany ? this.company : undefined;
    this.selectionForm.addControl('companyForm', this.inputModalService.companyForm(company));
  }

  // company作成
  // 作成後のidを返す
  private createCompany(): void{
    this.companyHttpService.create(this.company)
      .subscribe((value :any) =>{ 
        console.log('created_company');
        this.company = value['company']
        this.createdValues['company'] = value['company'];
        this.selectionSubject.next(this.company);
      })
  }

  // selection作成
  private createSelection(): void{
    this.selectionHttpService.create(this.selection)
      .subscribe((value :any) =>{ 
        console.log('created_selection');
        this.selection = value['selection'];
        this.createdValues['selection'] = this.selection;
        this.posted.emit(this.createdValues);
      })
  }

  get companyName() { return this.selectionForm.get('companyForm').get('name') }
  get companyKana() { return this.selectionForm.get('companyForm').get('kana') }
  get companyLink() { return this.selectionForm.get('companyForm').get('link') }
  get documentsPassword() { return this.selectionForm.get('documents_password') }
  get seasonId() { return this.selectionForm.get('season_id') }
}
