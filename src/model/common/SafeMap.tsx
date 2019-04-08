import { observable, action } from 'mobx';

type Nullable<T> = T | null;

export class SafeMap<U, T> {

    @observable
    private map: Map<U, Nullable<T>> = new Map();

    getOrNull = (t?: Nullable<T>): Nullable<T> => {
        return t == null ? null : t
    }

    has(key: U): boolean {
        return this.map.has(key)
    }

    get(key: U): Nullable<T> {
        return this.getOrNull(this.map.get(key));
    }

    @action set(key: U, value: T) {
        this.map.set(key, value);
    }
}