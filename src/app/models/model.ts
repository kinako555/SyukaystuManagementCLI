export class Model{
    id  : number;

    // もとのインスタンスを代入すると代入もとに変更が反映されるため複製する
    static duplication(fromModel: any):any {
        let toModel = new this();
        for(let key in fromModel) { toModel[key] = fromModel[key]; }
        return toModel;
    }
}