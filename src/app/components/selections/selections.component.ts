import { Component, OnInit } from '@angular/core';

import { Selection } from "../../models/Selection";
import { Choicese }  from "../../models/Choicese";
import { Company }   from "../../models/Company";

import { MyHttpService } from "../../servicese/my-http.service";
import { ModelService }  from "../../servicese/model.service";

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {

  closeIds  : any;
  selections: Selection[];
  choicese  : Choicese = new Choicese();
  companies  : Company[];

  constructor(private myHttpService: MyHttpService,
              private modelService : ModelService) { }

  ngOnInit() {
    this.get_initialize_values();
  }

  //検索結果を受け取ったときに走るイベント
  posted_search_result(selections: any) {
    console.log("searched");
    this.selections = selections;
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

}
