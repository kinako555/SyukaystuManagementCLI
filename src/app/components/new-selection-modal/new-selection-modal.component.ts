import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';

import { Selection } from "../../models/selection";
import { ApplicationWay } from "../../models/application-way";
import { Season } from "../../models/season";
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
  selectionSubject: Subject<number> = new Subject();
  createdValues   : Object = {};
  selectionState : Observable<number> = this.selectionSubject.asObservable();

  @Output() posted = new EventEmitter();
  @Input() company;
  @Input() choicese;

  constructor(private activeModal: NgbActiveModal,
              private selectionHttpService: SelectionHttpService,
              private companyHttpService: CompanyHttpService) { }

  ngOnInit() {
    // create_companyのレスポンスを受け取ったあとで処理
    this.selectionState.subscribe((id) => {
      this.selection.company_id = id;
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
    let id;
    this.companyHttpService.create(this.company)
      .subscribe((value :any) =>{ 
        console.log('created_company');
        id = value['id'];
        this.company.id = id;
        this.createdValues['company'] = this.company;
        this.selectionSubject.next(id);
      })
  }

  // selection作成
  private createSelection(): void{
    let id;
    this.selectionHttpService.create(this.selection)
      .subscribe((value :any) =>{ 
        console.log('created_selection');
        id = value['id'];
        this.selection.id = id;
        this.createdValues['selection'] = this.selection;
        this.posted.emit(this.createdValues);
      })
  }
}
