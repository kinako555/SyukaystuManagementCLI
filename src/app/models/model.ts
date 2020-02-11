export class Model {
    find_value(model_values: any, id: number) {
        model_values.find(v => v.id === id);
    }
}