import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { withStyles, createStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import RootStore from '../../model/store/RootStore';
import {ResourceName} from '../../model/common/ResourceName';
import {HalResource} from '../../model/common/HalResource';
import ProgressBar from '../../components/ProgressBar';

type Nullable<T> = T | null;

type Props = {
    rootStore?: RootStore
    classes: any
    theme: any
}
  
type State = {
    resourceName: ResourceName
}
  
@inject('rootStore')
@observer
class AssetList extends React.Component<Props> {

    state = {
        resourceName: ResourceName.PLATFORM_HOME,
    }

    componentDidMount() {
        console.log('did mount ok loading= ' + this.isLoading)
        this.invokeFetch()
    }
    
    @computed get
    isLoading(): boolean {
        if (this.props.rootStore) {
            const loadingMap = this.props.rootStore.halStore.resourcesStatuses;
            console.log('loading map ' + loadingMap)
            const loadingStatus =  this.props.rootStore.halStore.resourcesStatuses.get('PLATFORM_HOME')
            console.log('checking loading status ' + loadingStatus)
            return loadingStatus == null ? true : loadingStatus
        } else {
            return true
        }
    }

    invokeFetch() {

        if (this.props.rootStore) {
            console.log('ASSET LIST attempting to get PLATFORM_HOME..');
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
        return res == null ? '' : res.resolvePropertyOnResource('sessions',fieldName);
    }

    getEmbeddedList(): HalResource[]  {
        const res = this.getRootResource()
        return res == null ? [] : res.getAllEmbeddedResourceByName('sessions');
    }

    render () {
        const { classes } = this.props;
        return (
            !this.isLoading ? 
            <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Started At</TableCell>
                  <TableCell align="right">No Requests</TableCell>
                  <TableCell align="right">Client Host</TableCell>
                  <TableCell align="right">Server Host</TableCell>
                  <TableCell align="right">Identity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.getEmbeddedList().map((row, index) => (
                  
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row['startedAt']}
                    </TableCell>
                    <TableCell align="right">{row['numberOfRequests']}</TableCell>
                    <TableCell align="right">{row['clientHostAddress']}</TableCell>
                    <TableCell align="right">{row['serverHostAddress']}</TableCell>
                    <TableCell align="right">{row['identity']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper> : <ProgressBar/>
        )
    }
}

const styles = (theme:any) => createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
});

export default withStyles(styles, { withTheme: true })(AssetList)

