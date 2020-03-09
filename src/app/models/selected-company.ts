import { Company } from "./company";
import { Choicese } from "./choicese";

export class SelectedCompany {
    company_id   : number;
    company_name : string;
    company_kana : string;
    company_link : string;
    choicese: Choicese;

    //companyからselecred_companyに値を反映して返す
    static companyToSelecterdCompany(company: Company) :SelectedCompany{
        let selectedCompany = new SelectedCompany();
        selectedCompany.company_id = company.id;
        selectedCompany.company_name = company.name;
        selectedCompany.company_kana = company.kana;
        selectedCompany.company_link = company.link;

        return selectedCompany
    }
}