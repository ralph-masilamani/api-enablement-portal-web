import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles, createStyles } from '@material-ui/core';

import RootStore from '../../model/store/RootStore';
import {ResourceName} from '../../model/common/ResourceName';
import {HalResource} from '../../model/common/HalResource';

type Props = {
    rootStore?: RootStore
  }
  
  type State = {
      resourceName: ResourceName
  }
  
@inject('rootStore')
@observer
export default class AssetList extends React.Component<Props> {


    render () {
        return (
            
             <div>
                 Asset List Goes here
            </div>   
        )
    }
}