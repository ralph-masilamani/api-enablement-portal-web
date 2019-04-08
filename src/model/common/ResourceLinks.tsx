import { observable, action } from 'mobx';

export class ResourceLinks {

    @observable values = observable.map<string, string>();

    has(key: string) {
        return this.values.has(key);
    }

    get(key :string) {
        return this.values.get(key);
    }

    @action set(key: string, value: string) {
        this.values.set(key, value);
    }
}