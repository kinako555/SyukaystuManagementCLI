import { Component, OnInit } from '@angular/core';

import { Selection } from "../../models/selection";
import { Choicese }  from "../../models/Choicese";
import { Company }   from "../../models/Company";

import { MyHttpService } from "../../servicese/my-http.service";

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {

  closeIds  : any;
  selections: Selection[];
  choicese  : Choicese = new Choicese();
  companys  : Company[];

  constructor(private myHttpService: MyHttpService) { }

  ngOnInit() {
    this.get_initialize_values();
  }

  get_initialize_values() :void{
    this.myHttpService.get_initialize_values()
      .subscribe((value :any)  =>{ 
        this.choicese.selectionStautses = value.selection_statuses;
        this.choicese.seasons           = value.seasons;
        this.choicese.applicationWays   = value.application_way;
        this.closeIds   = value.close_ids;	
        this.selections = value.selections;
        this.companys   = value.companys;
      })
  }

}
