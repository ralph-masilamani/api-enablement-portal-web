import { observable, action } from 'mobx';
import {HalResource, ErrorResource} from '../common/HalResource';
import { ResourceName } from '../common/ResourceName';
import TransportLayer from '../TransportLayer';
import {ResourceLinks} from '../common/ResourceLinks';
import {SafeMap} from '../common/SafeMap';

//TODO INJECT THIS IN ?
export const apiUrl = 'http://localhost:9090';

//export const apiUrl = 'http://54.194.81.99:9090';

export const environment = {
    baseApiUrl: apiUrl +'/platform/33333'
}

type Nullable<T> = T | null;

export default class HalStore {

    private transportLayer: TransportLayer;
    
    @observable private resourceLinks: ResourceLinks = new ResourceLinks();

    @observable resources: SafeMap<string, Nullable<HalResource>> = new SafeMap();

    //TODO WRAPS THIS IN A COMPONENT
    @observable resourcesStatuses: Map<string, boolean> = new Map();

    @observable errors: Map<string, ErrorResource> = new Map();

    @action setResource = (resourceKey: string, resource: Nullable<HalResource>) => { this.resources.set(resourceKey, resource); } 

    constructor(transportLayer: TransportLayer) {
        this.transportLayer = transportLayer;
    }

    @action getPlatformHome() { 
        this.httpGetAndAddLinks(environment.baseApiUrl, ResourceName.PLATFORM_HOME)
    }

    @action
    public getResource(resourceKey: ResourceName) {
        console.log('attempting to get resource for key ' + resourceKey)
        if (this.resourceLinks.has(resourceKey)) {
            this.resourcesStatuses.set(resourceKey, true);
            let url = this.resourceLinks.get(resourceKey);
            if (url) {
                console.log('have key, attempting get resource for url ' + url);
                this.httpGetAndAddLinks(url, resourceKey);
            }
        } else {
            console.log('getResource key not available yet: ' + resourceKey)
            this.setResource(resourceKey, null);
        }
    }

    @action
    public createResource(resourceKey: ResourceName, body: any) {
        console.log('attempting create resource for key ' + resourceKey);
        console.log('key map size ' + this.resourceLinks.values.size);
        console.log('we have url ' + this.resourceLinks.get(resourceKey));
        if (this.resourceLinks.has(resourceKey)) {
            let url = this.resourceLinks.get(resourceKey);
            if (url) {
                console.log('have key, attempting create resource ' + resourceKey + ' ,for url ' + url);
                this.httpPost(url, body, resourceKey);
            }
        }
    }

    private httpGetAndAddLinks(url: string, resourceKey: ResourceName) {
        this.transportLayer.get(url)
            .then( response => {
                this.dealWithOk(response, resourceKey, "GET")
            })
            .catch(error => {
                this.catchException(error, resourceKey, "GET")
            })
    }

    private httpPost(url: string, body: any, resourceKey: ResourceName) {
        this.transportLayer.post(url, body)
            .then(response => {
                this.dealWithOk(response, resourceKey, "POST")
            })
            .catch(error => {
                this.catchException(error, resourceKey, "POST")
            })
    }

    dealWithOk = (response: any, resourceKey: string, httpMethod: string) => {
        console.log('HTTP ' + httpMethod + ' we got response ' + JSON.stringify(response.data))
        let resource: HalResource = this.createHalResource(response.data);
        this.addNewLinksToMap(resource);
        this.setResource(resourceKey, resource);
        this.resourcesStatuses.set(resourceKey, false);
    }

    catchException = ((error: any, resourceKey:string, httpMethod: string) => {
        console.log('HTTP ' + httpMethod + ' ERROR ' + JSON.stringify(error))
        this.errors.set(resourceKey, this.createError(error))
        this.resourcesStatuses.set(resourceKey, false);
        if (error.response) {
            //console.log('HTTP ' + httpMethod + ' ERROR RESPONSE ' + JSON.stringify(error.response))
            console.log('HTTP ' + httpMethod + ' STATUS ' + error.response.status);
        }
    })
    
    private addNewLinksToMap(resource: HalResource) {
        
        if (resource && resource.links) {
            
            resource.links.forEach((value, key) => {
                //console.log('adding new link 1 ' + key + ', value ' + JSON.stringify(value))
                if (!this.resourceLinks.has(key)) {
                    console.log('adding new link ' + key + ', value ' + JSON.stringify(value))
                    this.resourceLinks.set(key, value.href);
                    this.resourcesStatuses.set(key, true);
                    this.loadLazyResourceForLink(key, value);
                }
                
            });
        }
    }

    private loadLazyResourceForLink(key: string, value: string) {
         if (this.resources.has(key)) {
            console.log('we have resource with key in map ' + key);
            if (this.resources.get(key) == null) {
                console.log('we have NOT loaded resource for key ' + key);
                // this.getResource(key);
            } else {
                console.log('we have loaded resource for key ' + key);
            }
        } else {
            console.log('we have NO resource with key in map ' + key);
        }

    }

    private createHalResource(response: any): HalResource {
        return new HalResource(
          response,
          response.identity,
          response.properties,
          response._embedded,
          this.transform(response._links)
        );
    }

    //TODO figure this error type
    private createError(error: any): ErrorResource {

        let status = 0
        let message = "Sorry Something went wrong"
        if (error.response) {
            status = error.response.status
            message = error.response.data.message
        }

        return new ErrorResource(
            error.response,
            status,
            message
        )

    }
    //refactor into util ?
    public transform(object : any) : Map<string, any> {
        let map = new Map();
        if (object) {
          for (let k of Object.keys(object)) {
              map.set(k, object[k]);
          }
        }
        return map;
    }
} 