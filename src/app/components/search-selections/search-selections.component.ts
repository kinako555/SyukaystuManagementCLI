import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Choicese } from "../../models/choicese";

import { SelectionHttpService } from "../../servicese/selection-http.service";

@Component({
  selector: 'app-search-selections',
  templateUrl: './search-selections.component.html',
  styleUrls: ['./search-selections.component.css']
})
export class SearchSelectionsComponent implements OnInit {

  constructor(private selectionHttpService: SelectionHttpService) { }

  @Input()  choicese: Choicese;
  @Output() posted = new EventEmitter();

  ngOnInit() {
  }
  UN_SELECTED: string = "unselected";

  private searchParams = {
    company_name: '',
    season_id: null
  }

  // 検索ボタン
  submit() {
    let query = "";
    query = this.format_params(this.searchParams);
    this.selectionHttpService.search(query)
      .subscribe((value :any)  =>{ 
        this.posted.emit(value.selections);
      },
      error =>{
        console.log('error: ', error);
      });
  }

  // Objをクエリ文字に変換する
  //例 company_name=hogr&season_id=1
  private format_params(params: Object) :string{
    let rtn_str = "?";
    for (let key in params) {
      if (params[key] !== this.UN_SELECTED && params[key]) {
        rtn_str = rtn_str + key + "=" + params[key] + "&";
      }
    }
    // 末尾の&を削除
    if (rtn_str.match(/&/)) rtn_str.slice( 0, -1 );

    return rtn_str.slice( 0, -1 );
  }

}
