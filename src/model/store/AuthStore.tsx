import { observable, action } from 'mobx';
import HalStore from './HalStore';
import { ResourceName } from '../common/ResourceName';

export default class AuthStore {

    private halStore: HalStore

    @observable isAuthenticated: boolean = false;

    @observable currentUser: any = Object();

    constructor(halStore: HalStore) {
        this.halStore = halStore
    }

    @action setCurrentUser = (user: any, authenticated: boolean) => { 
        console.log('setting current user ',JSON.stringify(user))
        this.currentUser = user; 
        this.isAuthenticated = authenticated;
    } 

    @action logout = () => {
        this.setCurrentUser(null, false);
        this.halStore.setResource(ResourceName.SIGN_IN, null)
    }
}