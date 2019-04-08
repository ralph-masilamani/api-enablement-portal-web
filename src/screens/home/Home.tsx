import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { History } from 'history';

import RootStore from '../../model/store/RootStore';
import {ResourceName} from '../../model/common/ResourceName';
import {HalResource} from '../../model/common/HalResource';

type Nullable<T> = T | null;

type Props = {
  rootStore?: RootStore
}

type State = {
    resourceName: ResourceName
}

@inject('rootStore')
@observer
export default class Home extends React.Component<Props & {history: History}, State> {

    state = {
        resourceName: ResourceName.PLATFORM_HOME
    }

    componentDidMount() {
        this.invokeFetch()
    }
    
    invokeFetch() {

        if (this.props.rootStore) {
            console.log('attempting to get PLATFORM_HOME..');
           this.props.rootStore.halStore.getPlatformHome();
        }
    }

    getResourceByName(name: ResourceName) : Nullable<HalResource> {
        if (this.props.rootStore) {
            return this.props.rootStore.halStore.resources.get(name)
        }
        return null;
    }

    getRootResource() : HalResource {
        const res = this.getResourceByName(this.state.resourceName);
        return res == null ? new HalResource() : res
    }

    getEmbeddedProperty(fieldName: string): string  {
        const res = this.getRootResource()
        return res == null ? '' : res.resolvePropertyOnResource('USER_ACCOUNT',fieldName);
    }
    
    getProfileUrl(): string {
        const defaultValue = "http://pbs.twimg.com/profile_images/971750797586386944/i-uam9WT_normal.jpg"
        const value = this.getEmbeddedProperty('pictureUrl');
        console.log('profile url ' + value)
        return (value == null ? defaultValue : value)
    }
    
    render() {
        //const { location, push, goBack } = this.props.rootStore.routingStore;
        const history = this.props.history
        return (
            //const { location, push, goBack } = this.props.rootStore
            <div>
                Welcome Chimp
                <br></br>
                Root Identity : {this.getRootResource().identity} <br/>
                <button onClick={() => history.replace('/page2')}>Go to Page2</button>
            </div>
        )
    }
}