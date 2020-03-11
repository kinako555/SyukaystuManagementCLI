import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NewSelectionModalComponent } from '../new-selection-modal/new-selection-modal.component';

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
    this.get_initialize_values();
  }

  //検索結果を受け取ったときに走るイベント
  posted_search_result(selections: any): void{
    console.log("searched");
    this.selections = selections;
  }

  posted_create(selection: Selection): void{
    this.selections.push(selection);
  }  

  private get_initialize_values() :void{
    this.myHttpService.get_initialize_values()
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
    this.selections.push(create_values['selection']);
    if (create_values['company'] !== undefined) this.companies.push(create_values['company']);
  }

  // 新規作成モーダル表示
  // selectionから表示する場合はcompanyを渡す
  showCreateModal(companyId: number = null) {
    let company = new Company();
    if (companyId) company = this.modelService.find(this.companies, companyId);
    const modal = this.modalService.open(NewSelectionModalComponent, {backdrop: true});
    modal.componentInstance.company  = company;
    modal.componentInstance.choicese = this.choicese;
    modal.componentInstance.posted.subscribe( ($create_values) => {
      this.addCreateValues($create_values);
    })
  }

  delete(selectionId: number){
    this.selectionHttpService.delete(selectionId)
      .subscribe(()  =>{ 
        console.log('deleted');
        this.selections = new Selection().delete(this.selections, selectionId);
      })
  }

}
