import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  closeIds  : any;
  selections: Selection[];
  choicese  : Choicese= new Choicese();
  companies  : Company[];

  constructor(private myHttpService: MyHttpService,
              private selectionHttpService: SelectionHttpService,
              private modelService : ModelService,
              private modalService: NgbModal) { }

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
    modal.componentInstance.posted.subscribe( ($create_values) => {
      this.addCreateValues($create_values);
    })
  }

  // 編集作成モーダル表示
  showEditModal(selectionId: number = null) {
    const modal = this.modalService.open(EditSelectionModalComponent);
    modal.componentInstance.choicese = this.choicese;
    modal.componentInstance.selection = Selection.find(this.selections, selectionId);
    modal.componentInstance.posted.subscribe( ($create_values) => {
      this.addCreateValues($create_values);
    })
  }

  delete(selectionId: number){
    this.selectionHttpService.delete(selectionId)
      .subscribe(()  =>{ 
        console.log('deleted');
        this.selections = Selection.delete(this.selections, selectionId);
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

  private addCreateValues(create_values: Object): void{
    if (create_values['company'] !== undefined) this.companies.push(create_values['company']);
    this.selections.push(this.formatCreatedSelection(create_values['selection']));
  }

  // 選択枠(select)で選択するとIDが文字列になるのでとりあえず数値に変換する
  private formatCreatedSelection(value: Selection): Selection{
    let v_selection = value;
    v_selection.application_way_id = Number(v_selection.application_way_id);
    v_selection.season_id = Number(v_selection.season_id);
    v_selection.selection_status_id = Number(v_selection.selection_status_id);
    return v_selection
  }

  

}
