import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

export abstract class InputSelectionModal{

    selectionForm: FormGroup;
    companyForm: FormGroup;

    constructor(protected fb: FormBuilder){}

    protected setForm(values: Object):void {
        let company;
        let selection;
        if (values['company'] !== undefined) company = values['company'];
        if (values['selection'] !== undefined) selection = values['selection'];
        this.companyForm = this.fb.group({
          name: company.name,
          kana: company.kana,
          link: company.link,
        });
        this.selectionForm = this.fb.group({
          documents_password: selection.documents_password,
          season_id: selection.season_id,
          selection_status_id: selection.selection_status_id,
          application_way_id : selection.application_way_id,
        });
    }
}