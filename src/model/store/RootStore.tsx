import HalStore from "./HalStore";
import TransportLayer from '../TransportLayer';
import LocalStore from "./LocalStore";
import AuthStore from "./AuthStore";

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

/*
* Acts as a a root store, where other stores can be added.
* TODO Will need a ui store to store non B/E state, this can be injected in here
*/
export default class RootStore{

    halStore: HalStore;
    localStore: LocalStore;
    authStore: AuthStore;
    transportLayer: TransportLayer = new TransportLayer();
    routingStore: RouterStore

    constructor() {
        console.log('creating root store')
        this.halStore = new HalStore(this.transportLayer);
        this.localStore = new LocalStore();
        this.authStore = new AuthStore(this.halStore);
        this.routingStore = new RouterStore();
    }
}