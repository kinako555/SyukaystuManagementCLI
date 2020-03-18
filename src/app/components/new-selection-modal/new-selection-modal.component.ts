import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { Selection } from "../../models/selection";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
import { Company } from "../../models/company";
import { SelectionStatus } from "../../models/selection-status";

import { SelectionHttpService } from "../../servicese/selection-http.service";
import { CompanyHttpService } from "../../servicese/company-http.service";

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

  @Output() posted = new EventEmitter();
  @Input() company;
  @Input() choicese;

  constructor(private activeModal: NgbActiveModal,
              private selectionHttpService: SelectionHttpService,
              private companyHttpService: CompanyHttpService) { }

  ngOnInit() {
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
  submit() {
    this.createCompany();
    this.activeModal.close();
  }

  // キャンセルボタン
  cancel() { this.activeModal.close(); }

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
}
