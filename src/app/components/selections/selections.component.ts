import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

import { NewSelectionModalComponent } from '../new-selection-modal/new-selection-modal.component';
import { EditSelectionModalComponent } from '../edit-selection-modal/edit-selection-modal.component';


import { Selection } from "../../models/selection";
import { Choicese }  from "../../models/choicese";
import { Company }   from "../../models/company";

import { MyHttpService } from "../../servicese/my-http.service";
import { SelectionHttpService } from "../../servicese/selection-http.service";
import { ModelService }  from "../../servicese/model.service";

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {

  closeIds   : any;
  selections : Selection[];
  choicese   : Choicese= new Choicese();
  companies  : Company[];

  constructor(private myHttpService: MyHttpService,
              private selectionHttpService: SelectionHttpService,
              private modelService : ModelService,
              private modalService: NgbModal,
              private fb: FormBuilder
              ) { }

  ngOnInit() {
    this.getInitializeValues();
  }

  //検索結果を受け取ったときに走るイベント
  postedSearchResult(selections: any): void{
    console.log("searched");
    this.selections = selections;
  }

  // 新規作成モーダル表示
  // selectionから表示する場合はcompanyを渡す
  showCreateModal(companyId: number = null) {
    let company = new Company();
    if (companyId) company = this.modelService.find(this.companies, companyId);
    const modal = this.modalService.open(NewSelectionModalComponent);
    modal.componentInstance.company  = company;
    modal.componentInstance.choicese = this.choicese;
    modal.componentInstance.forms = this.createNewForm();
    modal.componentInstance.posted.subscribe( ($create_values) => {
      this.addCreateValues($create_values);
      this.addSelection($create_values['selection']);
    })
  }

  // 編集作成モーダル表示
  showEditModal(selection: Selection) {
    const modal = this.modalService.open(EditSelectionModalComponent);
    let company = this.modelService.find(this.companies, selection.company_id);
    this.createForm(company, selection);
    modal.componentInstance.company   = Company.duplication(company);
    modal.componentInstance.choicese  = this.choicese;
    modal.componentInstance.selection = Selection.duplication(selection);
    modal.componentInstance.forms = this.createForm(company, selection);
    modal.componentInstance.posted.subscribe( ($create_values) => {
      this.updateValues($create_values);
      this.updateSelection($create_values['selection']);
    })
  }

  delete(selectionId: number){
    this.selectionHttpService.delete(selectionId)
      .subscribe(()  =>{ 
        console.log('deleted');
        this.selections = this.modelService.delete(this.selections, selectionId);
      })
  }

  private getInitializeValues() :void{
    this.myHttpService.getInitializeValues()
      .subscribe((value :any)  =>{ 
        this.choicese.selectionStautses = value.selection_statuses;
        this.choicese.seasons           = value.seasons;
        this.choicese.applicationWays   = value.application_ways;
        this.closeIds   = value.close_ids;	
        this.selections = value.selections;
        this.companies   = value.companies;
      })
  }

  private createForm(company: Company, selection: Selection) :Object{
    let forms = {};
    forms['company'] = this.fb.group({
      id  : company.id,
      name: company.name,
      kana: company.kana,
      link: company.link,
    });
    forms['selection'] = this.fb.group({
      id: selection.id,
      documents_password: selection.documents_password,
      season_id: selection.season_id,
      selection_status_id: selection.selection_status_id,
      application_way_id : selection.application_way_id,
    });

    return forms;
  }

  private createNewForm() :Object{
    let forms = {};
    forms['company'] = this.fb.group({
      name: '',
      kana: '',
      link: '',
    });
    forms['selection'] = this.fb.group({
      documents_password: '',
      season_id: '',
      selection_status_id: '',
      application_way_id : '',
    });

    return forms;
  }

  private addSelection(selection: Selection): void{
    this.selections.push(this.formatSelection(selection));
  }

  private updateSelection(seleciton :Selection):void{
    this.selections = this.modelService.update(this.selections, this.formatSelection(seleciton));
  }

  private addCreateValues(create_values: Object): void{
    if (create_values['company'] !== undefined) this.companies.push(create_values['company']);
  }

  private updateValues(create_values: Object): void{
    if (create_values['company'] !== undefined) this.companies = this.modelService.update(this.companies, create_values['company']);
  }

  // 選択枠(select)で選択するとIDが文字列になるのでとりあえず数値に変換する
  private formatSelection(value: Selection): Selection{
    let v_selection = value;
    v_selection.application_way_id  = Number(v_selection.application_way_id);
    v_selection.season_id           = Number(v_selection.season_id);
    v_selection.selection_status_id = Number(v_selection.selection_status_id);
    return v_selection
  }

  

}
