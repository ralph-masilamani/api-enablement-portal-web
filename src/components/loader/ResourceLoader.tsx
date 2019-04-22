import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core';

import RootStore from '../../model/store/RootStore';
import {ResourceName} from '../../model/common/ResourceName';

interface Props extends RouteComponentProps {
    rootStore?: RootStore
}

@inject('rootStore')
@observer
class ResourceLoader extends React.Component<Props> {

    state = {
        resourceName: ResourceName.PLATFORM_HOME,
    }

    componentDidMount() {
        //console.log('did mount ok loading= ' + this.isLoading)
        this.invokeFetch()
    }

    invokeFetch() {

        if (this.props.rootStore) {
           console.log('ResourceLoader attempting to get PLATFORM_HOME..');
           this.props.rootStore.halStore.getPlatformHome();
        }
    }
    render() {
        return(
            <div>

            </div>
        )
    }
}

export default withRouter(ResourceLoader)