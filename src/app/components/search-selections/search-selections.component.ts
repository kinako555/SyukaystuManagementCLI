import { Component, OnInit, Input } from '@angular/core';

import { Choicese } from "../../models/Choicese";

@Component({
  selector: 'app-search-selections',
  templateUrl: './search-selections.component.html',
  styleUrls: ['./search-selections.component.css']
})
export class SearchSelectionsComponent implements OnInit {

  constructor() { }

  @Input() choicese: Choicese;

  ngOnInit() {
  }

}
