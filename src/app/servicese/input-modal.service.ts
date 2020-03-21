import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from "../models/company";
import { Selection } from "../models/selection";

@Injectable({
  providedIn: 'root'
})
export class InputModalService {

  constructor(private fb: FormBuilder) { }

  companyForm(company: Company = undefined): FormGroup{
    let name = company !== undefined ? company.name : ''; 
    let kana = company !== undefined ? company.kana : '';
    let link = company !== undefined ? company.link : '';
    let form = this.fb.group({
      name: [name, [Validators.required, Validators.maxLength(50)]],
      kana: [kana, [Validators.maxLength(100)]],
      link: [link, [Validators.maxLength(200)]],
    });;
    if (company !== undefined) form.addControl('id', new FormControl(company.id));
    return form
  }

  selectionForm(selection: Selection = undefined): FormGroup{
    let documents_password  = selection !== undefined ? selection.documents_password  : ''; 
    let season_id           = selection !== undefined ? selection.season_id           : undefined;
    let selection_status_id = selection !== undefined ? selection.selection_status_id : undefined;
    let application_way_id  = selection !== undefined ? selection.selection_status_id : undefined;
    
    let form= this.fb.group({
      documents_password: [documents_password, [Validators.maxLength(20)]],
      season_id: [season_id, [Validators.required]],
      selection_status_id: selection_status_id,
      application_way_id : application_way_id,
    });
    if (selection !== undefined) form.addControl('id', new FormControl(selection.id));
    return form
  }
}
