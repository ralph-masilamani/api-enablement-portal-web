import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles, createStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Login from '../../screens/login/Login'
import RootStore from '../../model/store/RootStore';
import {ResourceName} from '../../model/common/ResourceName';

type Props = {
    rootStore?: RootStore
    classes: any
}

@inject('rootStore')
@observer
export class HomeLayout extends React.Component<Props> {

    state = {
        resourceName: ResourceName.PLATFORM_HOME,
    }

    componentDidMount() {
        //console.log('did mount ok loading= ' + this.isLoading)
        this.invokeFetch()
    }

    invokeFetch() {

        if (this.props.rootStore) {
           console.log('HOME attempting to get PLATFORM_HOME..');
           this.props.rootStore.halStore.getPlatformHome();
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Login/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            SummaryList
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                           Welcome blah blah
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = (theme:any) => createStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

export default withStyles(styles, { withTheme: true })(HomeLayout)