import { Component, OnInit } from '@angular/core';

import { Season } from "./models/season";
import { SelectionStatus } from "./models/selection-status";
import { ApplicationWay } from "./models/application-way";
import { Selection } from "./models/selection";

import { MyHttpService } from "./servicese/my-http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  seasons :Season[];
  selectionStatuses :SelectionStatus[];
  applicationWay    :ApplicationWay[];
  closeIds: {};
  selections :Selection[];

  constructor(private myHttpService: MyHttpService) { }

  ngOnInit() {
    this.get_initialize_values();
    console.log(this.closeIds);
  }
  
  get_initialize_values() :void{
    this.myHttpService.get_initialize_values()
      .subscribe(any  =>{ 
        this.seasons           = any.seasons;
        this.selectionStatuses = any.selection_statuses;	
        this.applicationWay    = any.application_way;	
        this.closeIds          = any.close_ids;	
        this.selections        = any.selections;	
      })
  }

}
